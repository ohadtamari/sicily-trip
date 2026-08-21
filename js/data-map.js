// נקודות נוספות למפה שלא מגיעות ישירות מפריטי המסלול (data-trip.js):
// מלונות (חלק כבר סופיים, חלק placeholder - טרם נבחרו), רכב.
// נקודות האטרקציות/מסעדות/אירועים כבר מגיעות אוטומטית מ-TRIP_DAYS (items עם lat/lng).

const HOTELS_PLACEHOLDER = [
  { dayNum: 1, base: 'catania', name: '🏨 Vivere Hotel', lat: 37.5028, lng: 15.0863, note: 'Via Vittorio Emanuele II 210, Catania' },
  { dayNum: 4, base: 'taormina', name: '🏨 Hotel Villa Paradiso', lat: 37.8524, lng: 15.2880, note: 'Via Roma 2 - חניה במקום, גישה לחוף פרטי בלטויאני' },
  { dayNum: 6, base: 'santavenerina', name: '🏨 Tenuta San Michele (Cantine Murgo)', lat: 37.6980, lng: 15.1330, note: 'אגריטוריזמו, 15 חדרים, בריכה - יקב Murgo (מבעבעים)' },
  { dayNum: 8, base: 'palermo', name: '🏨 Casa Balarm (דירה)', lat: 38.1212, lng: 13.3698, note: 'קסטלמארה, כמה צעדים מלה-קאלה - קומה 2, בלי מעלית. צ\'ק-אין 15:00-19:00, צ\'ק-אאוט עד 10:00' },
];

const AIRPORTS = [
  { dayNum: 1, name: '🛬 שדה תעופה קטניה (פונטנרוסה) - נחיתה', lat: 37.4668, lng: 15.0664 },
  { dayNum: 11, name: '🛫 שדה תעופה קטניה (פונטנרוסה) - המראה', lat: 37.4668, lng: 15.0664 },
];

// המלצות פלרמו (לא-אוכל) מגל (חברה) - נאספו מרשימת Google Maps משותפת "פלרמו המלצות"
// dayNum 9 = היום הראשי בפלרמו (ראו data-trip.js) - כדי שהנקודות יודגשו נכון במפה
const PALERMO_EXTRA_POINTS = [
  { dayNum: 9, name: '🧴 Ortigia (Sicilia) - חנות בשמים', lat: 38.1207, lng: 13.3607, note: 'חנות טובה לסבון טבעי באריזות יפות' },
  { dayNum: 9, name: '🏛️ Stanze al Genio (מוזיאון אריחי מיוליקה)', lat: 38.1145, lng: 13.3660, note: 'מוזיאון אריחי שיש. רק עברתי ליד אבל נראה יפה' },
  { dayNum: 9, name: '🏛️ Palazzo Butera', lat: 38.1128, lng: 13.3689, note: 'מוזיאון במבנה מהמם. כדאי' },
  { dayNum: 9, name: '🎭 Teatro Massimo', lat: 38.1216, lng: 13.3612, note: 'בית האופרה🤤' },
  { dayNum: 9, name: '⛲ Fontana Pretoria', lat: 38.1153, lng: 13.3616, note: 'כיכר/מזרקה מפורסמת עם פסלים של חיות' },
  { dayNum: 9, name: '💀 Catacombe dei Cappuccini', lat: 38.1084, lng: 13.3489, note: 'מערות קבורה של נזירים. ייחודי אבל לא ממליץ אלא אם אתה ממש רוצה לראות גופות' },
];

// אופציות עצירה למקדונלדס בדרך מסנטה ונרינה לפלרמו ביום 8 (ראו גם טאב אוכל)
const MCDONALDS_STOPS = [
  { dayNum: 8, name: "🍔 McDonald's Enna (McDrive)", lat: 37.5528, lng: 14.2984, note: 'Via Libero Grassi 16F-16M, Enna - בערך באמצע הדרך' },
  { dayNum: 8, name: "🍔 McDonald's - Autogrill Caracoli Nord", lat: 37.9672, lng: 13.7255, note: 'A19 כיוון פלרמו, ק"מ 164, ליד טרמיני אימרזה - קרוב יותר לפלרמו' },
];

const MAP_ICONS = {
  hotel: '🏨', food: '🍽️', attraction: '📍', car: '🚗', gas: '⛽', beach: '🏖️', airport: '🛬',
};
