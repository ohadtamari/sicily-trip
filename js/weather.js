// טאב מזג האוויר: Open-Meteo (חינמי, ללא מפתח). מזג אוויר חי + תחזית 16 יום + תחזית שעתית + זריחה/שקיעה,
// עם cache יומי ב-localStorage כדי לא לבצע fetch בכל פתיחה. מגיב לפס הקשר-יום (יום ספציפי / "הכל").

const WEATHER_CACHE_KEY = 'sicily-weather-cache-v2';

const WMO_CODES = {
  0: { e: '☀️', l: 'בהיר' }, 1: { e: '🌤️', l: 'בהיר בעיקר' }, 2: { e: '⛅', l: 'מעונן חלקית' }, 3: { e: '☁️', l: 'מעונן' },
  45: { e: '🌫️', l: 'ערפל' }, 48: { e: '🌫️', l: 'ערפל קופא' },
  51: { e: '🌦️', l: 'טפטוף קל' }, 53: { e: '🌦️', l: 'טפטוף' }, 55: { e: '🌧️', l: 'טפטוף חזק' },
  61: { e: '🌧️', l: 'גשם קל' }, 63: { e: '🌧️', l: 'גשם' }, 65: { e: '🌧️', l: 'גשם חזק' },
  71: { e: '🌨️', l: 'שלג קל' }, 73: { e: '🌨️', l: 'שלג' }, 75: { e: '❄️', l: 'שלג כבד' },
  80: { e: '🌦️', l: 'ממטרים' }, 81: { e: '🌦️', l: 'ממטרים' }, 82: { e: '⛈️', l: 'ממטרים עזים' },
  95: { e: '⛈️', l: 'סופת רעמים' }, 96: { e: '⛈️', l: 'סופת רעמים עם ברד' }, 99: { e: '⛈️', l: 'סופת רעמים עם ברד' },
};
function wmo(code) { return WMO_CODES[code] || { e: '🌡️', l: '' }; }

// מצב טאב מזג האוויר נגזר מפס הקשר-היום (כמו שאר הטאבים) - יום ספציפי או "הכל"
function weatherMode() {
  if (AppState.allSelected) return { mode: 'all' };
  const day = getDayByNum(AppState.selectedDayNum);
  return { mode: 'day', day, base: BASES[day.base] };
}

async function fetchWeatherData(lat, lng) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
    `&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m` +
    `&hourly=temperature_2m,weather_code,precipitation_probability` +
    `&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max,sunrise,sunset` +
    `&timezone=Europe%2FRome&forecast_days=16`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('weather fetch failed: ' + res.status);
  return res.json();
}

async function getWeatherForBase(baseId) {
  const base = BASES[baseId];
  const todayKey = toDateKey(new Date());
  let cache = {};
  try { cache = JSON.parse(localStorage.getItem(WEATHER_CACHE_KEY)) || {}; } catch (e) { cache = {}; }
  const entry = cache[baseId];
  if (entry && entry.fetchedDateKey === todayKey) return entry.data;
  const data = await fetchWeatherData(base.lat, base.lng);
  cache[baseId] = { fetchedDateKey: todayKey, data };
  localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(cache));
  return data;
}

function formatHour(isoString) {
  return isoString.slice(11, 16);
}
function formatTime(isoString) {
  return isoString.slice(11, 16);
}

function renderCurrentWeather(data, day, base) {
  const el = document.getElementById('weatherCurrentCard');
  const cur = data.current;
  const w = wmo(cur.weather_code);
  const isToday = toDateKey(new Date()) === day.date;
  const modeLabel = isToday ? `כרגע ב${base.label}` : `${base.label} · יום ${day.num} · ${formatDDMM(day.date)} (${day.weekday})`;
  let currentHtml = '';
  if (isToday) {
    currentHtml = `
      <div class="weather-current">
        <div style="font-size:2.6rem;">${w.e}</div>
        <div>
          <div class="temp">${Math.round(cur.temperature_2m)}°C</div>
          <div style="color:var(--text-muted);font-size:0.85rem;">${w.l} · לחות ${cur.relative_humidity_2m}% · רוח ${Math.round(cur.wind_speed_10m)} קמ"ש</div>
        </div>
      </div>`;
  }
  const dayIdx = data.daily.time.indexOf(day.date);
  let dailySummaryHtml = '';
  if (dayIdx !== -1) {
    const dw = wmo(data.daily.weather_code[dayIdx]);
    const max = Math.round(data.daily.temperature_2m_max[dayIdx]);
    const min = Math.round(data.daily.temperature_2m_min[dayIdx]);
    const pop = data.daily.precipitation_probability_max[dayIdx];
    dailySummaryHtml = `
      <div class="weather-daily-summary${isToday ? ' with-current' : ''}">
        <div style="font-size:${isToday ? '1.6rem' : '2.6rem'};">${dw.e}</div>
        <div>
          <div class="temp">${max}° / ${min}°</div>
          <div style="color:var(--text-muted);font-size:0.85rem;">${dw.l} · 💧${pop}%</div>
        </div>
      </div>`;
  } else {
    dailySummaryHtml = `<div style="color:var(--text-muted);font-size:0.85rem;">התחזית ליום הזה עדיין לא זמינה (מעבר לטווח 16 הימים) - תופיע אוטומטית ככל שמתקרבים.</div>`;
  }
  el.innerHTML = `
    <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:6px;">${modeLabel}</div>
    ${currentHtml}
    ${dailySummaryHtml}`;
}

function renderSunTimes(data, day) {
  const el = document.getElementById('weatherSunCard');
  const dayIdx = data.daily.time.indexOf(day.date);
  if (dayIdx === -1 || !data.daily.sunrise || !data.daily.sunrise[dayIdx]) {
    el.innerHTML = '';
    el.style.display = 'none';
    return;
  }
  el.style.display = '';
  const sunrise = formatTime(data.daily.sunrise[dayIdx]);
  const sunset = formatTime(data.daily.sunset[dayIdx]);
  el.innerHTML = `
    <div class="weather-sun-row">
      <div class="weather-sun-item">🌅 <span>זריחה</span><b>${sunrise}</b></div>
      <div class="weather-sun-item">🌇 <span>שקיעה</span><b>${sunset}</b></div>
    </div>`;
}

function renderHourly(data, day) {
  const card = document.getElementById('weatherHourlyCard');
  const el = document.getElementById('weatherHourly');
  const times = data.hourly.time;
  const indices = [];
  times.forEach((t, i) => { if (t.slice(0, 10) === day.date) indices.push(i); });
  if (!indices.length) {
    card.style.display = 'none';
    el.innerHTML = '';
    return;
  }
  card.style.display = '';
  let html = '';
  indices.forEach(i => {
    const w = wmo(data.hourly.weather_code[i]);
    const temp = Math.round(data.hourly.temperature_2m[i]);
    const pop = data.hourly.precipitation_probability[i];
    html += `
      <div class="hour-slot">
        <div class="hour-time">${formatHour(times[i])}</div>
        <div style="font-size:1.2rem;">${w.e}</div>
        <div>${temp}°</div>
        <div style="font-size:0.68rem;color:var(--text-muted);">💧${pop}%</div>
      </div>`;
  });
  el.innerHTML = html;
}

async function renderDayWeather(ctx) {
  document.getElementById('weatherDayView').style.display = '';
  document.getElementById('weatherAllView').style.display = 'none';
  const data = await getWeatherForBase(ctx.day.base);
  renderCurrentWeather(data, ctx.day, ctx.base);
  renderSunTimes(data, ctx.day);
  renderHourly(data, ctx.day);
}

async function renderAllDaysWeather() {
  document.getElementById('weatherDayView').style.display = 'none';
  document.getElementById('weatherAllView').style.display = '';
  const grid = document.getElementById('weatherForecast');
  const note = document.getElementById('weatherNote');
  grid.innerHTML = 'טוען...';

  const uniqueBases = Array.from(new Set(TRIP_DAYS.map(d => d.base)));
  const dataByBase = {};
  await Promise.all(uniqueBases.map(async baseId => {
    dataByBase[baseId] = await getWeatherForBase(baseId);
  }));

  let html = '';
  let matchedAny = false;
  TRIP_DAYS.forEach(day => {
    const data = dataByBase[day.base];
    const dayIdx = data.daily.time.indexOf(day.date);
    if (dayIdx === -1) return;
    matchedAny = true;
    const w = wmo(data.daily.weather_code[dayIdx]);
    const max = Math.round(data.daily.temperature_2m_max[dayIdx]);
    const min = Math.round(data.daily.temperature_2m_min[dayIdx]);
    const pop = data.daily.precipitation_probability_max[dayIdx];
    html += `
      <div class="forecast-day">
        <div class="fd-name">יום ${day.num}</div>
        <div style="font-size:0.7rem;color:var(--text-muted);">${formatDDMM(day.date)}</div>
        <div style="font-size:1.3rem;">${w.e}</div>
        <div>${max}°/${min}°</div>
        <div style="font-size:0.68rem;color:var(--text-muted);">💧${pop}%</div>`;
    html += `</div>`;
  });
  grid.innerHTML = html;
  note.textContent = matchedAny
    ? 'תחזית מ-Open-Meteo, מתעדכנת פעם ביום. כל יום מוצג לפי מזג האוויר בבסיס הרלוונטי לאותו יום, ועשוי להשתנות בסמוך למועד.'
    : 'התחזית ל-16 הימים הקרובים עדיין לא מכסה את מועד הטיול - היא תופיע כאן אוטומטית ככל שמתקרבים.';
}

async function initWeather() {
  const ctx = weatherMode();
  try {
    if (ctx.mode === 'all') {
      await renderAllDaysWeather();
    } else {
      await renderDayWeather(ctx);
    }
  } catch (e) {
    document.getElementById('weatherCurrentCard').textContent = 'לא ניתן היה לטעון מזג אוויר כרגע (בדקו חיבור אינטרנט).';
    console.error(e);
  }
}
