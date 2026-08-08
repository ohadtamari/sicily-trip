// ערכת נושא: light/dark אוטומטי לפי שקיעה/זריחה מקומיים (SunCalc), עם טוגל ידני שנשמר מקומית

const THEME_OVERRIDE_KEY = 'sicily-theme-override'; // 'light' | 'dark' | null (=אוטומטי)

function computeAutoTheme(now = new Date()) {
  const coords = getCurrentBaseCoords();
  try {
    const times = SunCalc.getTimes(now, coords.lat, coords.lng);
    const isDay = now >= times.sunrise && now < times.sunset;
    return isDay ? 'light' : 'dark';
  } catch (e) {
    const h = now.getHours();
    return (h >= 6 && h < 19) ? 'light' : 'dark';
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '🌙' : '☀️';
  if (typeof refreshMapTiles === 'function') refreshMapTiles();
}

function refreshTheme() {
  const override = localStorage.getItem(THEME_OVERRIDE_KEY);
  applyTheme(override || computeAutoTheme());
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || computeAutoTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_OVERRIDE_KEY, next);
  applyTheme(next);
}

function initTheme() {
  refreshTheme();
  const btn = document.getElementById('themeToggle');
  if (btn) btn.addEventListener('click', toggleTheme);
  onDayContextChange(refreshTheme);
  setInterval(refreshTheme, 30 * 60 * 1000); // רענון כל 30 דקות (חוצה שקיעה/זריחה בזמן שהאתר פתוח)
}

document.addEventListener('DOMContentLoaded', initTheme);
