// נתוני הטיול: בסיסים, ימים ומסלול יומי
// כל הקואורדינטות משוערות (מרכז העיר/אתר) - מדויקות מספיק למפה ולמזג אוויר.

const BASES = {
  catania:   { label: 'קטניה',              lat: 37.5079, lng: 15.0830 },
  ortigia:   { label: 'אורטיג\'יה (סירקוזה)', lat: 37.0587, lng: 15.2933 },
  noto:      { label: 'נוטו',                lat: 36.8909, lng: 15.0709 },
  taormina:  { label: 'טאורמינה',            lat: 37.8516, lng: 15.2853 },
  etna:      { label: 'אטנה (Rifugio Sapienza)', lat: 37.7000, lng: 14.9958 },
  alcantara: { label: 'נחל אלקנטרה',          lat: 37.8804, lng: 15.1734 },
  palermo:   { label: 'פלרמו',               lat: 38.1157, lng: 13.3615 },
  monreale:  { label: 'מונריאלה',            lat: 38.0819, lng: 13.2903 },
  cefalu:    { label: 'צ\'פאלו',             lat: 38.0400, lng: 14.0231 },
  santavenerina: { label: 'סנטה ונרינה (יקב Tenuta San Michele)', lat: 37.6980, lng: 15.1330 },
};

// TRIP_DAYS: 11 ימי הטיול. dayOffset בפריטי מסלול = הפעילות בפועל ביום קלנדרי הבא
// (למשל נחיתה ב-01:10 בליל 17/9->18/9 מוצגת תחת "יום 1" עם badge "+1+").
const TRIP_DAYS = [
  {
    num: 1, date: '2026-09-17', weekday: 'חמישי', base: 'catania',
    title: 'הגעה לקטניה (לילה)', hasCar: false,
    items: [
      { time: '19:30', title: 'איסוף למונית/הסעה לנתב"ג', desc: '', icon: '🚕' },
      { time: '22:50', title: 'טיסה W4 6528: תל אביב ← קטניה', desc: 'המראה מנתב"ג', icon: '✈️' },
      { time: '01:10', dayOffset: 1, title: 'נחיתה בקטניה', desc: '', icon: '🛬' },
      { time: '01:45', dayOffset: 1, title: 'פספורט + מזוודות', desc: '', icon: '🛂' },
      { time: '02:00', dayOffset: 1, title: 'מונית למלון', desc: 'לא תחבורה ציבורית בשעה הזו', icon: '🚕' },
      { time: '02:30', dayOffset: 1, title: 'שינה', desc: '', icon: '😴' },
    ],
  },
  {
    num: 2, date: '2026-09-18', weekday: 'שישי', base: 'catania',
    title: 'קטניה - התאוששות וסיור עיר', hasCar: false,
    items: [
      { time: '08:30', title: 'לה פשקריה - שוק הדגים', desc: 'הכי חי בבוקר מוקדם, לפני 11:00', icon: '🐟', lat: 37.5024, lng: 15.0873 },
      { time: '11:00', title: 'פיאצה דל דואומו + מזרקת הפיל', desc: 'סמל העיר', icon: '⛲', lat: 37.5023, lng: 15.0872 },
      { time: '12:30', title: 'ויה אטנאה', desc: 'הרחוב הראשי, קניות ואווירה', icon: '🛍️', lat: 37.5064, lng: 15.0876 },
      { time: '18:00', title: 'וילה בליני', desc: 'גנים יפים, טוב לשקיעה', icon: '🌳', lat: 37.5096, lng: 15.0916 },
      { time: '20:00', title: 'ארוחת ערב + גרניטה בפיסטוק', desc: 'ספסיאליטה מקומית - שווה לתכנן, גם לארוחת בוקר למחרת', icon: '🍧' },
      { time: '22:00', title: 'פיאצה בליני / ויה מונטסאנו', desc: 'ברים, אווירת סטודנטים', icon: '🍹' },
    ],
    note: 'חניה: גם אם לא נוהגים היום, שווה לבחור מלון עם חניה/גראז\' קרוב - מהיום הבא כבר יש רכב.',
  },
  {
    num: 3, date: '2026-09-19', weekday: 'שבת', base: 'catania',
    title: 'טיול יום ברכב: אורטיג\'יה + נוטו', hasCar: true,
    items: [
      { time: '09:00', title: 'איסוף רכב - Sixt קטניה עיר', desc: 'Via Monfalcone 1B, קטניה (לא בשדה - חוסך נסיעה מיותרת)', icon: '🚗', lat: 37.4995, lng: 15.0785 },
      { time: '09:30', title: 'נסיעה לאורטיג\'יה', desc: '~50 דק\'', icon: '🛣️' },
      { time: '10:20', title: 'אורטיג\'יה', desc: 'האי ההיסטורי הקטן: פיאצה דואומו, מזרקת ארתוזה, שוק, מסעדות דגים. 3-4 שעות הליכה רגועה', icon: '🏛️', base: 'ortigia', lat: 37.0587, lng: 15.2933 },
      { time: '14:30', title: 'נסיעה לנוטו', desc: '~35 דק\' מאורטיג\'יה', icon: '🛣️' },
      { time: '15:00', title: 'נוטו', desc: 'רחוב ראשי בארוקי מרשים - במיוחד יפה עם אור אחר הצהריים/שקיעה', icon: '🏛️', base: 'noto', lat: 36.8909, lng: 15.0709 },
      { time: '18:30', title: 'חזרה לקטניה', desc: '~1 שעה', icon: '🛣️' },
    ],
  },
  {
    num: 4, date: '2026-09-20', weekday: 'ראשון', base: 'catania',
    title: 'קטניה ← טאורמינה', hasCar: true,
    items: [
      { time: '09:00', title: 'בוקר אחרון בקטניה', desc: 'מה שלא הספקתם ביום 2 - למשל טירת אורסינו, מונסטרו דיי בנדטיני', icon: '🏰' },
      { time: '13:00', title: 'נסיעה לטאורמינה', desc: '~45 דק\'', icon: '🛣️' },
      { time: '14:00', title: 'צ\'ק אין ב-Hotel Villa Paradiso (Via Roma 2)', desc: 'חניה במקום, מרכז העיר, גישה לחוף פרטי בלטויאני', icon: '🏨', base: 'taormina', lat: 37.8524, lng: 15.2880 },
      { time: '19:00', title: 'קורסו אומברטו', desc: 'הרחוב הראשי', icon: '🚶', base: 'taormina', lat: 37.8528, lng: 15.2894 },
      { time: '19:45', title: 'פיאצה IX אפריל', desc: 'שקיעה עם נוף לים ולאטנה', icon: '🌅', base: 'taormina', lat: 37.8534, lng: 15.2889 },
    ],
  },
  {
    num: 5, date: '2026-09-21', weekday: 'שני', base: 'taormina',
    title: 'יום חופשי/רגוע בטאורמינה', hasCar: true,
    items: [
      { time: '10:00', title: 'ים - חוף פרטי בלטויאני / איזולה בלה', desc: 'חוף פרטי כלול ב-Nuova Spiaggia Paradiso בלטויאני, או איזולה בלה', icon: '🏖️', base: 'taormina', lat: 37.8459, lng: 15.2960 },
      { time: '15:00', title: 'טאורמינה בעצמה', desc: 'טירת קסטלמולה, גני העיר', icon: '🏰', base: 'taormina', lat: 37.8656, lng: 15.2758 },
      { time: '20:00', title: 'מנוחה', desc: 'לפני שני ימי היקב', icon: '😌' },
    ],
  },
  {
    num: 6, date: '2026-09-22', weekday: 'שלישי', base: 'taormina',
    title: 'טאורמינה → אלקנטרה → יקב Tenuta San Michele', hasCar: true,
    items: [
      { time: '09:00', title: 'צ\'ק-אאוט מ-Villa Paradiso', desc: '', icon: '🧳', base: 'taormina' },
      { time: '09:30', title: 'גולה דל אלקנטרה', desc: 'Gole dell\'Alcantara - קניון בזלת דרמטי, הליכה קצרה ונגישה. סטייה מכוונת מהדרך הישירה ליקב, מוסיפה כשעה-שעה וחצי לנסיעה הכוללת', icon: '🏞️', base: 'alcantara', lat: 37.8804, lng: 15.1734 },
      { time: '12:00', title: 'המשך נסיעה לסנטה ונרינה', desc: '~1-1.5 שעות מאלקנטרה', icon: '🛣️' },
      { time: '14:00', title: 'צ\'ק-אין ב-Tenuta San Michele (Via Zafferana 13)', desc: 'התאקלמות, סיור ביקב Murgo, ארוחת ערב/טעימות', icon: '🏨', base: 'santavenerina' },
    ],
  },
  {
    num: 7, date: '2026-09-23', weekday: 'רביעי', base: 'santavenerina',
    title: 'אטנה + יין - יום פנוי ביקב', hasCar: true,
    items: [
      { time: '08:30', title: 'נסיעה ל-Rifugio Sapienza', desc: 'צד דרומי, ~30-40 דק\' מסנטה ונרינה', icon: '🛣️' },
      { time: '09:30', title: 'רכבל Funivia dell\'Etna', desc: 'עד 2,500 מ\', אופציה להמשיך בג\'יפ 4X4 עד ~2,800-3,000 מ\' עם מדריך (כ-60 יורו לשילוב, לבדוק מחיר מעודכן)', icon: '🚡', base: 'etna', lat: 37.7000, lng: 14.9958 },
      { time: '11:30', title: 'הליכה סביב המכתשים', desc: 'לא הרפתקה קשה - מתאים למי שלא רוצה טרק ארוך', icon: '🥾', base: 'etna' },
      { time: '15:00', title: 'חזרה ליקב', desc: 'בריכה, טעימות יין נוספות ב-Tenuta San Michele, ארוחת ערב במקום', icon: '🍷', base: 'santavenerina' },
    ],
  },
  {
    num: 8, date: '2026-09-24', weekday: 'חמישי', base: 'santavenerina',
    title: 'יקב → פלרמו', hasCar: true,
    items: [
      { time: '09:00', title: 'צ\'ק-אאוט מ-Tenuta San Michele', desc: '', icon: '🧳', base: 'santavenerina' },
      { time: '09:30', title: 'נהיגה לפלרמו', desc: '~2.5-3 שעות', icon: '🛣️' },
      { time: '12:00', title: 'תדלוק לפני החזרה', desc: 'למלא דלק ליד וילגרציה די קריני / צ\'יניזי (~10 ק"מ מהשדה) - לשמור קבלה', icon: '⛽' },
      { time: '12:30', title: 'החזרת רכב - Sixt שדה פלרמו', desc: 'לא במרכז העיר - נמנעים מנהיגה/חניה בעיר עצמה', icon: '🚗', base: 'palermo', lat: 38.1809, lng: 13.0910 },
      { time: '13:30', title: 'הסעה/רכבת/מונית למרכז פלרמו', desc: '~40-60 דק\'', icon: '🚆' },
      { time: '15:00', title: 'צ\'ק אין', desc: 'מומלץ ללון באזור מרכז היסטורי / קלסה / קוואטרו קנטי', icon: '🏨', base: 'palermo' },
      { time: '19:00', title: 'ערב ראשון בעיר', desc: 'התאקלמות', icon: '🌆', base: 'palermo' },
    ],
  },
  {
    num: 9, date: '2026-09-25', weekday: 'שישי', base: 'palermo',
    title: 'פלרמו', hasCar: false,
    items: [
      { time: '09:00', title: 'שוק באלארו', desc: 'אוכל רחוב (פנלה, ספליאונה), אווירת סוק', icon: '🛒', base: 'palermo', lat: 38.1113, lng: 13.3572 },
      { time: '12:00', title: 'קפלה פלטינה', desc: 'Cappella Palatina - פסיפסים ביזנטיים-נורמניים מדהימים', icon: '🕌', base: 'palermo', lat: 38.1113, lng: 13.3532 },
      { time: '19:00', title: 'שוק ווצ\'יריה', desc: 'ערב - חיי לילה', icon: '🛒', base: 'palermo', lat: 38.1194, lng: 13.3617 },
      { time: '21:00', title: 'אזור קלסה', desc: 'מרכז חיי הלילה של פלרמו, כולל הסצנה הגאה (EXIT10&LOVE ועוד)', icon: '🍹', base: 'palermo' },
    ],
  },
  {
    num: 10, date: '2026-09-26', weekday: 'שבת', base: 'palermo',
    title: 'פלרמו + מונריאלה', hasCar: false,
    items: [
      { time: '10:00', title: 'קתדרלת מונריאלה', desc: 'טיול קצר מחוץ לעיר (~30 דק\') - יש אוטובוס מפלרמו, אין צורך ברכב', icon: '⛪', base: 'monreale', lat: 38.0819, lng: 13.2903 },
      { time: '14:00', title: 'צ\'פאלו (אופציונלי)', desc: 'יום/חצי יום נוסף, נגישה ברכבת אזורית (~45-60 דק\')', icon: '🏖️', base: 'cefalu', lat: 38.0400, lng: 14.0231 },
      { time: '21:00', title: 'קלסה / ווצ\'יריה', desc: 'ערב - בול הזמן שלכם לסצנה של סוף שבוע', icon: '🍹', base: 'palermo' },
    ],
  },
  {
    num: 11, date: '2026-09-27', weekday: 'ראשון', base: 'palermo',
    title: 'עזיבה', hasCar: false,
    items: [
      { time: '07:30', title: 'רכבת ישירה: פלרמו ← קטניה שדה תעופה', desc: '~3 שעות - לצאת בבוקר עם מרווח ביטחון', icon: '🚆' },
      { time: '17:40', title: 'טיסה W4 6527: קטניה ← תל אביב', desc: '', icon: '✈️', base: 'catania' },
      { time: '21:55', title: 'נחיתה בת"א', desc: '', icon: '🛬' },
    ],
  },
];

const TRIP_START_DATE = '2026-09-17';
const TRIP_END_DATE = '2026-09-27';
