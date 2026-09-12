// נתוני לינה: 4 מקומות הלינה בטיול - צ'ק אין/אאוט, הזמנה ופרטי קשר

const LODGING_STAYS = [
  {
    id: 'vivere',
    name: 'Vivere Hotel',
    emoji: '🏨',
    base: 'catania',
    address: 'Via Vittorio Emanuele II 210, קטניה',
    lat: 37.5028, lng: 15.0863,
    dayRange: [1, 4],
    checkIn: { dayNum: 1, date: '2026-09-18', time: '02:15' },
    checkOut: { dayNum: 4, date: '2026-09-20', time: '12:00' },
    bookedVia: 'EL AL TRAVEL',
    reservedBy: 'עידן',
  },
  {
    id: 'villa-paradiso',
    name: 'Hotel Villa Paradiso',
    emoji: '🏨',
    base: 'taormina',
    address: 'Via Roma 2, טאורמינה',
    lat: 37.8524, lng: 15.2880,
    dayRange: [4, 6],
    checkIn: { dayNum: 4, date: '2026-09-20', time: '14:15' },
    checkOut: { dayNum: 6, date: '2026-09-22', time: '09:00' },
    bookedVia: 'אתר המלון',
    reservedBy: 'אוהד',
    notes: ['חניה במקום', 'מרכז העיר', 'גישה לחוף פרטי בלטויאני (Nuova Spiaggia Paradiso)'],
  },
  {
    id: 'tenuta-san-michele',
    name: 'Tenuta San Michele',
    emoji: '🏨',
    base: 'santavenerina',
    address: 'Via Zafferana 13, סנטה ונרינה',
    dayRange: [6, 8],
    checkIn: { dayNum: 6, date: '2026-09-22', time: '13:30' },
    checkOut: { dayNum: 8, date: '2026-09-24', time: '09:30' },
    bookedVia: 'Booking.com',
    reservedBy: 'עידן',
    notes: ['בריכה במקום', 'יקב Murgo - אירועי טעימות יין בערבים'],
  },
  {
    id: 'casa-balarm',
    name: 'Casa Balarm',
    emoji: '🏨',
    base: 'palermo',
    address: 'קסטלמארה, ליד לה-קאלה, פלרמו',
    lat: 38.1212, lng: 13.3698,
    dayRange: [8, 11],
    checkIn: { dayNum: 8, date: '2026-09-24', time: '19:00' },
    checkOut: { dayNum: 11, date: '2026-09-27', time: '09:45' },
    bookedVia: 'Airbnb',
    reservedBy: 'אוהד',
    hostName: 'דוד',
    notes: ['דירה, קומה 2 בלי מעלית', 'חלון צ\'ק-אין: 15:00-19:00 - חשוב לא לאחר'],
  },
];

function lodgingRelevantForDay(stay, dayNum) {
  return dayNum >= stay.dayRange[0] && dayNum <= stay.dayRange[1];
}
