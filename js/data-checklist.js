// נתוני עמוד "מה לעשות": צ'קליסט אתרים/פעילויות לפי אזור, עם יום מומלץ וקישור למפות.
// מבוסס על הצ'קליסט המצומצם שהוכן מראש, בתוספת המלצות פלרמו (לא-אוכל) מגל (חברה)
// שכבר מופיעות כ-PALERMO_EXTRA_POINTS ב-data-map.js (לצרכי סימון על המפה).
// source: 'plan' = מהתכנון המקורי, 'friend' = המלצה מחבר (עם friendName)

const CHECKLIST_AREAS = [
  { id: 'catania', label: '🌋 קטניה' },
  { id: 'ortigia_noto', label: "🏛️ אורטיג'יה + נוטו" },
  { id: 'taormina', label: '🌅 טאורמינה' },
  { id: 'alcantara', label: '🏞️ גולה דל אלקנטרה' },
  { id: 'etna_winery', label: '🍷 יקב + אזור אטנה' },
  { id: 'palermo', label: '🏙️ פלרמו' },
  { id: 'optional', label: '⭐ אופציונלי - אם יישאר זמן' },
];

function checklistMapUrl(lat, lng, placeId) {
  return 'https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lng + (placeId ? '&query_place_id=' + placeId : '');
}

const CHECKLIST_ITEMS = [
  // קטניה (17-20/9)
  {
    id: 'la-pescheria', areaId: 'catania', base: 'catania', dayLabel: 'יום 2',
    nameHe: 'לה פשקריה', nameIt: 'La Pescheria / Catania Fish Market',
    note: 'שוק הדגים, בבוקר', lat: 37.5018273, lng: 15.0870043, placeId: 'ChIJwStnHC_jExMRlVux7ojgnyY',
  },
  {
    id: 'piazza-duomo-catania', areaId: 'catania', base: 'catania', dayLabel: 'יום 2',
    nameHe: 'פיאצה דל דואומו + מזרקת הפיל', nameIt: "Piazza del Duomo / Fontana dell'Elefante (\"u Liotru\")",
    note: '', lat: 37.5025169, lng: 15.0870996, placeId: 'ChIJV63v_C7jExMRLThjTCcPppk',
  },
  {
    id: 'via-etnea', areaId: 'catania', base: 'catania', dayLabel: 'יום 2',
    nameHe: 'ויה אטנֶאָה', nameIt: 'Via Etnea',
    note: 'הליכת ערב', lat: 37.503894, lng: 15.0871153, placeId: 'ChIJY0P1DNT8ExMR9QiL54XqybI',
  },
  {
    id: 'villa-bellini', areaId: 'catania', base: 'catania', dayLabel: 'יום 2',
    nameHe: 'וילה בליני', nameIt: 'Giardino Bellini / Villa Bellini',
    note: 'שקיעה', lat: 37.510677, lng: 15.0849635, placeId: 'ChIJydglUdP8ExMRsgDnWML-5yE',
  },

  // אורטיג'יה + נוטו - טיול יום (יום 3, 19/9)
  {
    id: 'piazza-duomo-ortigia', areaId: 'ortigia_noto', base: 'ortigia', dayLabel: 'יום 3',
    nameHe: 'פיאצה דל דואומו', nameIt: 'Piazza Duomo, Ortigia',
    note: "אורטיג'יה", lat: 37.0593903, lng: 15.2931439, placeId: 'ChIJlVcyLBnMExMRsKPMQ--ZHWA',
  },
  {
    id: 'fonte-aretusa', areaId: 'ortigia_noto', base: 'ortigia', dayLabel: 'יום 3',
    nameHe: 'מזרקת ארתוזה', nameIt: 'Fonte Aretusa / Arethusa Spring',
    note: "אורטיג'יה", lat: 37.0572976, lng: 15.2929282, placeId: 'ChIJD_kB4xjMExMRF5FGPhmuSck',
  },
  {
    id: 'cattedrale-noto', areaId: 'ortigia_noto', base: 'noto', dayLabel: 'יום 3',
    nameHe: 'קתדרלת נוטו', nameIt: 'Cattedrale di San Nicolò, Noto',
    note: 'הרחוב הראשי הבארוקי - הכי יפה באור אחר-הצהריים', lat: 36.8914537, lng: 15.0706713, placeId: 'ChIJkcQ3964pEhMRwjKdylpBk4c',
  },

  // טאורמינה (20-22/9)
  {
    id: 'corso-umberto', areaId: 'taormina', base: 'taormina', dayLabel: 'יום 4',
    nameHe: 'קורסו אומברטו', nameIt: 'Corso Umberto',
    note: '', lat: 37.8513013, lng: 15.2845274,
  },
  {
    id: 'piazza-ix-aprile', areaId: 'taormina', base: 'taormina', dayLabel: 'יום 4',
    nameHe: 'פיאצה IX אפריל', nameIt: 'Piazza IX Aprile',
    note: 'שקיעה עם נוף לים ולאטנה', lat: 37.8516181, lng: 15.285882, placeId: 'ChIJhVpSIwARFBMRMMyyJC0_9hU',
  },
  {
    id: 'spiaggia-paradiso', areaId: 'taormina', base: 'taormina', dayLabel: 'יום 5',
    nameHe: 'חוף פרטי', nameIt: 'Nuova Spiaggia Paradiso, Letojanni',
    note: 'כלול דרך Villa Paradiso', lat: 37.8860812, lng: 15.3149625, placeId: 'ChIJNQJfdfMVFBMR1gziJUSjaLY',
  },

  // גולה דל אלקנטרה (יום 6, 22/9 - בדרך ליקב)
  {
    id: 'gole-alcantara', areaId: 'alcantara', base: 'alcantara', dayLabel: 'יום 6',
    nameHe: "גולה דל אלקנטרה", nameIt: "Gole dell'Alcantara",
    note: 'הליכה על המדרכה לאורך הקניון + מדרגות/מעלית לנחל', lat: 37.8800533, lng: 15.1738675, placeId: 'ChIJf4W1PFMaFBMRqQTYLuKJK26',
  },

  // יקב Tenuta San Michele / אזור אטנה (22-24/9)
  {
    id: 'cantine-murgo-checklist', areaId: 'etna_winery', base: 'santavenerina', dayLabel: 'יום 6-7',
    nameHe: 'קנטינה מורגו', nameIt: 'Cantine Murgo 1860',
    note: 'טעימות יין, במיוחד ה-Etna Spumante (מבעבעים) - המוצר שהיקב הכי מפורסם בו', lat: 37.6926104, lng: 15.1263248, placeId: 'ChIJV5nQWPsHFBMRw40dOMTC0x4',
  },
  {
    id: 'rifugio-sapienza', areaId: 'etna_winery', base: 'etna', dayLabel: 'יום 7',
    nameHe: 'רפוג\'יו סאפיינצה', nameIt: 'Rifugio Sapienza',
    note: 'אטנה - רכבל + ג\'יפ עם מדריך עד ~2,800-3,000 מ\'', lat: 37.7005125, lng: 14.9985029, placeId: 'ChIJCaEVdsWqFhMR88TGiRLi-bs',
  },

  // פלרמו (24-27/9)
  {
    id: 'la-vucciria', areaId: 'palermo', base: 'palermo', dayLabel: 'יום 9',
    nameHe: 'שוק לה ווצ\'יריה', nameIt: 'La Vucciria',
    note: 'קרוב לדירה', lat: 38.1173914, lng: 13.3637435, placeId: 'ChIJQ4EkbwDlGRMRP53aLchtD4s',
  },
  {
    id: 'mercato-ballaro', areaId: 'palermo', base: 'palermo', dayLabel: 'יום 9',
    nameHe: 'שוק באלארו', nameIt: 'Mercato Ballarò',
    note: 'הכי תוסס בבוקר מוקדם', lat: 38.1106144, lng: 13.3636751, placeId: 'ChIJG10YKgDlGRMRgvss8tSK0oc',
  },
  {
    id: 'cappella-palatina', areaId: 'palermo', base: 'palermo', dayLabel: 'יום 9',
    nameHe: 'קפלה פלטינה', nameIt: 'Cappella Palatina, Palazzo Reale',
    note: 'פסיפסים ביזנטיים-נורמניים', lat: 38.1109676, lng: 13.35362, placeId: 'ChIJRT-UYGTvGRMR47yr7zq9rbA',
  },
  {
    id: 'duomo-cefalu', areaId: 'palermo', base: 'cefalu', dayLabel: 'יום 10',
    nameHe: 'קתדרלת צ\'פאלו', nameIt: 'Duomo di Cefalù',
    note: 'קתדרלה נורמנית + חוף + טיילת, רכבת ישירה מפלרמו (~40-45 דק\')', lat: 38.0400904, lng: 14.0231717, placeId: 'ChIJa0OFxOk7FxMRLo4qlyTPcO8',
  },
  {
    id: 'nightlife-kalsa-vucciria', areaId: 'palermo', base: 'palermo', dayLabel: 'ליל 25-26/9',
    nameHe: 'חיי לילה - קלסה/ווצ\'יריה', nameIt: 'La Kalsa / Vucciria nightlife',
    note: 'שווה לבדוק תוכנייה מעודכנת קרוב לתאריך. Bunker Men\'s Club (הקישור למטה) - וגם EXIT10&LOVE, שמיקומו המדויק לא ודאי (יש בר בשם דומה "Exit Drink" אך לא בטוח שזה אותו מקום) - כדאי לוודא לפני ההגעה',
    lat: 38.1180066, lng: 13.3647114, placeId: 'ChIJJQtqTMXlGRMRJtub7FnenQ0',
  },

  // המלצות פלרמו (לא-אוכל) מגל (חברה) - נאספו מרשימת Google Maps משותפת "פלרמו המלצות"
  {
    id: 'ortigia-sicilia-shop', areaId: 'palermo', base: 'palermo', dayLabel: 'יום 9', source: 'friend', friendName: 'גל',
    nameHe: 'Ortigia (Sicilia) - חנות בשמים', nameIt: 'Ortigia (Sicilia) perfumery',
    note: 'חנות טובה לסבון טבעי באריזות יפות', lat: 38.1207, lng: 13.3607,
  },
  {
    id: 'stanze-al-genio', areaId: 'palermo', base: 'palermo', dayLabel: 'יום 9', source: 'friend', friendName: 'גל',
    nameHe: 'Stanze al Genio (מוזיאון אריחי מיוליקה)', nameIt: 'Stanze al Genio',
    note: 'מוזיאון אריחי שיש. רק עברתי ליד אבל נראה יפה', lat: 38.1145, lng: 13.3660,
  },
  {
    id: 'palazzo-butera', areaId: 'palermo', base: 'palermo', dayLabel: 'יום 9', source: 'friend', friendName: 'גל',
    nameHe: 'Palazzo Butera', nameIt: 'Palazzo Butera',
    note: 'מוזיאון במבנה מהמם. כדאי', lat: 38.1128, lng: 13.3689,
  },
  {
    id: 'teatro-massimo', areaId: 'palermo', base: 'palermo', dayLabel: 'יום 9', source: 'friend', friendName: 'גל',
    nameHe: 'Teatro Massimo', nameIt: 'Teatro Massimo',
    note: 'בית האופרה 🤤', lat: 38.1216, lng: 13.3612,
  },
  {
    id: 'fontana-pretoria', areaId: 'palermo', base: 'palermo', dayLabel: 'יום 9', source: 'friend', friendName: 'גל',
    nameHe: 'Fontana Pretoria', nameIt: 'Fontana Pretoria',
    note: 'כיכר/מזרקה מפורסמת עם פסלים של חיות', lat: 38.1153, lng: 13.3616,
  },
  {
    id: 'catacombe-cappuccini', areaId: 'palermo', base: 'palermo', dayLabel: 'יום 9', source: 'friend', friendName: 'גל',
    nameHe: 'Catacombe dei Cappuccini', nameIt: 'Catacombe dei Cappuccini',
    note: 'מערות קבורה של נזירים. ייחודי אבל לא ממליץ אלא אם ממש רוצים לראות גופות', lat: 38.1084, lng: 13.3489,
  },

  // אופציונלי
  {
    id: 'cattedrale-monreale', areaId: 'optional', base: 'monreale', dayLabel: 'יום 10', optional: true,
    nameHe: 'קתדרלת מונריאלה', nameIt: 'Cattedrale di Monreale',
    note: 'לא הכרחי - לשקול לוותר אם היום כבר מלא', lat: 38.0820509, lng: 13.29207, placeId: 'ChIJkzHupj_uGRMRguQLH5DlPgM',
  },
];
