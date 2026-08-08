// נקודות נוספות למפה שלא מגיעות ישירות מפריטי המסלול (data-trip.js):
// מלונות (placeholder - טרם הוזמנו), רכב.
// נקודות האטרקציות/מסעדות/אירועים כבר מגיעות אוטומטית מ-TRIP_DAYS (items עם lat/lng).

const HOTELS_PLACEHOLDER = [
  { dayNum: 1, base: 'catania', name: '🏨 מלון קטניה - להשלמה', lat: 37.5060, lng: 15.0870, note: 'לבחור עם חניה/גראז\' קרוב' },
  { dayNum: 4, base: 'taormina', name: '🏨 מלון טאורמינה - להשלמה', lat: 37.8524, lng: 15.2880, note: 'לוודא חניה - המרכז הוא ZTL' },
  { dayNum: 8, base: 'palermo', name: '🏨 מלון פלרמו - להשלמה', lat: 38.1147, lng: 13.3641, note: 'אזור מרכז היסטורי / קלסה / קוואטרו קנטי' },
];

const AIRPORTS = [
  { dayNum: 1, name: '🛬 שדה תעופה קטניה (פונטנרוסה) - נחיתה', lat: 37.4668, lng: 15.0664 },
  { dayNum: 11, name: '🛫 שדה תעופה קטניה (פונטנרוסה) - המראה', lat: 37.4668, lng: 15.0664 },
];

const MAP_ICONS = {
  hotel: '🏨', food: '🍽️', attraction: '📍', car: '🚗', gas: '⛽', beach: '🏖️', airport: '🛬',
};
