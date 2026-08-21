// ערכת נושא: light/dark אוטומטי לפי שקיעה/זריחה מקומיים (SunCalc), עם טוגל ידני 3 מצבים:
// אוטומטי (🌗) -> בהיר קבוע (☀️) -> כהה קבוע (🌙) -> חזרה לאוטומטי...
// המצב הידני נשמר בזיכרון בלבד (לא ב-localStorage) - כל טעינה מחדש של הדף חוזרת לאוטומטי.

let _themeMode = 'auto'; // 'auto' | 'light' | 'dark' - באיפוס בכל טעינת דף

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

function getThemeMode() {
  return _themeMode;
}

const THEME_MODE_ICON = { auto: '🌗', light: '☀️', dark: '🌙' };
const THEME_MODE_TITLE = {
  auto: 'מצב אוטומטי (לפי שקיעה/זריחה בסיציליה) - לחצו למצב בהיר קבוע',
  light: 'מצב בהיר קבוע - לחצו למצב כהה קבוע',
  dark: 'מצב כהה קבוע - לחצו לחזרה למצב אוטומטי',
};

function applyTheme(theme, mode) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.textContent = THEME_MODE_ICON[mode];
    btn.title = THEME_MODE_TITLE[mode];
  }
  if (typeof refreshMapTiles === 'function') refreshMapTiles();
}

function refreshTheme() {
  const mode = getThemeMode();
  const theme = mode === 'auto' ? computeAutoTheme() : mode;
  applyTheme(theme, mode);
}

function toggleTheme() {
  const current = getThemeMode();
  _themeMode = current === 'auto' ? 'light' : (current === 'light' ? 'dark' : 'auto');
  refreshTheme();
}

function initTheme() {
  refreshTheme();
  const btn = document.getElementById('themeToggle');
  if (btn) btn.addEventListener('click', toggleTheme);
  onDayContextChange(refreshTheme);
  setInterval(refreshTheme, 30 * 60 * 1000); // רענון כל 30 דקות (חוצה שקיעה/זריחה בזמן שהאתר פתוח)
  // ב-iOS, פתיחת bookmark למסך הבית לרוב רק מעלה חזרה קדימה עמוד קיים (ללא רענון),
  // וטיימרים לא רצים ברקע - לכן צריך לרענן את התאורה במפורש כשהאפליקציה חוזרת לחזית
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshTheme(); });
  window.addEventListener('pageshow', refreshTheme);
}

document.addEventListener('DOMContentLoaded', initTheme);
