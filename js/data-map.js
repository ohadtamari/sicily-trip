// נקודות נוספות למפה שלא מגיעות ישירות מפריטי המסלול (data-trip.js):
// מלונות (חלק כבר סופיים, חלק placeholder - טרם נבחרו), רכב.
// נקודות האטרקציות/מסעדות/אירועים כבר מגיעות אוטומטית מ-TRIP_DAYS (items עם lat/lng).

const HOTELS_PLACEHOLDER = [
  { dayNum: 1, base: 'catania', name: '🏨 מלון קטניה - להשלמה', lat: 37.5060, lng: 15.0870, note: 'לבחור עם חניה/גראז\' קרוב' },
  { dayNum: 4, base: 'taormina', name: '🏨 Hotel Villa Paradiso', lat: 37.8524, lng: 15.2880, note: 'Via Roma 2 - חניה במקום, גישה לחוף פרטי בלטויאני' },
  { dayNum: 6, base: 'santavenerina', name: '🏨 Tenuta San Michele (Cantine Murgo)', lat: 37.6980, lng: 15.1330, note: 'אגריטוריזמו, 15 חדרים, בריכה - יקב Murgo (מבעבעים)' },
  { dayNum: 8, base: 'palermo', name: '🏨 מלון פלרמו - להשלמה', lat: 38.1147, lng: 13.3641, note: 'אזור מרכז היסטורי / קלסה / קוואטרו קנטי' },
];

const AIRPORTS = [
  { dayNum: 1, name: '🛬 שדה תעופה קטניה (פונטנרוסה) - נחיתה', lat: 37.4668, lng: 15.0664 },
  { dayNum: 11, name: '🛫 שדה תעופה קטניה (פונטנרוסה) - המראה', lat: 37.4668, lng: 15.0664 },
];

const MAP_ICONS = {
  hotel: '🏨', food: '🍽️', attraction: '📍', car: '🚗', gas: '⛽', beach: '🏖️', airport: '🛬',
};
