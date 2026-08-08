// ניהול "הקשר היום" - היום הנבחר, ניווט בחצים, מצב "הכל", וזיהוי אוטומטי
// של היום הנוכחי (כולל טיפול בפעילויות שחוצות חצות - badge "+1")

const WEEKDAY_HE = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

// מצב גלובלי של האפליקציה - נגיש מכל הקבצים (משותפים אותו global scope בדפדפן)
const AppState = {
  currentPage: 'map',
  selectedDayNum: 1,   // 1..11
  allSelected: false,  // true = מצב "הכל"
  listeners: [],        // callbacks שרצים כשהיום/העמוד משתנים
};

function onDayContextChange(cb) { AppState.listeners.push(cb); }
function notifyDayContextChange() { AppState.listeners.forEach(cb => cb()); }

function getCurrentBaseCoords() {
  if (AppState.allSelected) return BASES.catania;
  const day = getDayByNum(AppState.selectedDayNum);
  if (day && BASES[day.base]) return BASES[day.base];
  return BASES.catania;
}

// כל ה-base-ים (ערים/אתרים) הרלוונטיים ליום נתון: הבסיס הראשי + כל תת-מיקום
// שמופיע בפריטי המסלול של אותו יום (למשל יום 3: קטניה + אורטיג'יה + נוטו)
function getRelevantBasesForDay(day) {
  const set = new Set([day.base]);
  day.items.forEach(item => { if (item.base) set.add(item.base); });
  return set;
}

function pad2(n) { return String(n).padStart(2, '0'); }

function toDateKey(d) {
  return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
}

function addDaysToKey(dateKey, days) {
  const [y, m, d] = dateKey.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + days);
  return toDateKey(dt);
}

function getDayByNum(num) {
  return TRIP_DAYS.find(d => d.num === num) || null;
}

function getDayByDateKey(dateKey) {
  return TRIP_DAYS.find(d => d.date === dateKey) || null;
}

// קובע איזה יום-מסלול "פעיל" כרגע, לפי השעון האמיתי של המכשיר.
// לפני חצות (00:00-05:59) עדיין שייך ליום הקודם אם ליום הקודם יש פעילויות +1.
function computeAutoDayNum(now = new Date()) {
  const hour = now.getHours();
  let effectiveKey = toDateKey(now);
  if (hour < 6) {
    const prevKey = addDaysToKey(effectiveKey, -1);
    const prevDay = getDayByDateKey(prevKey);
    if (prevDay && prevDay.items.some(it => it.dayOffset)) {
      effectiveKey = prevKey;
    }
  }
  const match = getDayByDateKey(effectiveKey);
  if (match) return match.num;
  if (effectiveKey < TRIP_START_DATE) return 1;
  return TRIP_DAYS[TRIP_DAYS.length - 1].num;
}

// מחזיר את התאריך "בפועל" (calendar date) של פריט מסלול, לפי dayOffset
function itemActualDateKey(day, item) {
  return item.dayOffset ? addDaysToKey(day.date, item.dayOffset) : day.date;
}

function formatDDMM(dateKey) {
  const [, m, d] = dateKey.split('-');
  return d + '.' + m;
}
