// טאב מזג האוויר: Open-Meteo (חינמי, ללא מפתח). מזג אוויר חי + תחזית 16 יום,
// עם cache יומי ב-localStorage כדי לא לבצע fetch בכל פתיחה.

const WEATHER_CACHE_KEY = 'sicily-weather-cache-v1';

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

function weatherMode(now = new Date()) {
  const todayKey = toDateKey(now);
  if (todayKey < TRIP_START_DATE) return { mode: 'before', base: BASES.catania };
  if (todayKey > TRIP_END_DATE) return { mode: 'after', base: BASES.catania };
  const dayNum = computeAutoDayNum(now);
  const day = getDayByNum(dayNum);
  return { mode: 'during', base: BASES[day.base], day };
}

async function fetchWeatherData(lat, lng) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
    `&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m` +
    `&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max` +
    `&timezone=Europe%2FRome&forecast_days=16`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('weather fetch failed: ' + res.status);
  return res.json();
}

async function getWeather(coords) {
  const todayKey = toDateKey(new Date());
  const cacheRaw = localStorage.getItem(WEATHER_CACHE_KEY);
  if (cacheRaw) {
    try {
      const cache = JSON.parse(cacheRaw);
      if (cache.fetchedDateKey === todayKey && Math.round(cache.lat) === Math.round(coords.lat) && Math.round(cache.lng) === Math.round(coords.lng)) {
        return cache.data;
      }
    } catch (e) { /* ignore */ }
  }
  const data = await fetchWeatherData(coords.lat, coords.lng);
  localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify({ fetchedDateKey: todayKey, lat: coords.lat, lng: coords.lng, data }));
  return data;
}

function renderCurrentWeather(data, ctx) {
  const el = document.getElementById('weatherCurrentCard');
  const cur = data.current;
  const w = wmo(cur.weather_code);
  const modeLabel = ctx.mode === 'during' ? `כרגע ב${ctx.base.label}` : `כרגע ב${ctx.base.label} (יעד ראשון בטיול)`;
  el.innerHTML = `
    <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:6px;">${modeLabel}</div>
    <div class="weather-current">
      <div style="font-size:2.6rem;">${w.e}</div>
      <div>
        <div class="temp">${Math.round(cur.temperature_2m)}°C</div>
        <div style="color:var(--text-muted);font-size:0.85rem;">${w.l} · לחות ${cur.relative_humidity_2m}% · רוח ${Math.round(cur.wind_speed_10m)} קמ"ש</div>
      </div>
    </div>`;
}

function renderForecast(data) {
  const grid = document.getElementById('weatherForecast');
  const note = document.getElementById('weatherNote');
  grid.innerHTML = '';
  const days = data.daily.time;
  let matchedAny = false;
  days.forEach((dateKey, i) => {
    const tripDay = getDayByDateKey(dateKey);
    if (!tripDay && (dateKey < TRIP_START_DATE || dateKey > TRIP_END_DATE)) return; // מציגים רק ימי הטיול
    matchedAny = true;
    const w = wmo(data.daily.weather_code[i]);
    const max = Math.round(data.daily.temperature_2m_max[i]);
    const min = Math.round(data.daily.temperature_2m_min[i]);
    const pop = data.daily.precipitation_probability_max[i];
    const div = document.createElement('div');
    div.className = 'forecast-day';
    div.innerHTML = `
      <div class="fd-name">${tripDay ? 'יום ' + tripDay.num : ''}</div>
      <div style="font-size:0.7rem;color:var(--text-muted);">${formatDDMM(dateKey)}</div>
      <div style="font-size:1.3rem;">${w.e}</div>
      <div>${max}°/${min}°</div>
      <div style="font-size:0.68rem;color:var(--text-muted);">💧${pop}%</div>`;
    grid.appendChild(div);
  });
  note.textContent = matchedAny
    ? 'תחזית מ-Open-Meteo, מתעדכנת פעם ביום. שימו לב: התחזית מחושבת לפי מיקום הבסיס הרלוונטי להיום, ועשויה להשתנות בסמוך למועד.'
    : 'התחזית ל-16 הימים הקרובים עדיין לא מכסה את מועד הטיול - היא תופיע כאן אוטומטית ככל שמתקרבים.';
}

async function initWeather() {
  const ctx = weatherMode();
  try {
    const data = await getWeather(ctx.base);
    renderCurrentWeather(data, ctx);
    renderForecast(data);
  } catch (e) {
    document.getElementById('weatherCurrentCard').textContent = 'לא ניתן היה לטעון מזג אוויר כרגע (בדקו חיבור אינטרנט).';
    console.error(e);
  }
}
