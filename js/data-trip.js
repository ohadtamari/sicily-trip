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
      { time: '01:10', dayOffset: 1, title: 'פספורט + מזוודות', desc: '~40 דק\'', icon: '🛂' },
      { time: '01:50', dayOffset: 1, title: 'מונית למלון', desc: '~20-25 דק\' - לא תחבורה ציבורית בשעה הזו', icon: '🚕' },
      { time: '02:15', dayOffset: 1, title: 'צ\'ק-אין, שינה', desc: '', icon: '😴' },
    ],
  },
  {
    num: 2, date: '2026-09-18', weekday: 'שישי', base: 'catania',
    title: 'קטניה - התאוששות וסיור עיר', hasCar: false,
    items: [
      { time: '10:30', title: 'לה פשקריה - שוק הדגים (La Pescheria)', desc: 'עדיין פעיל גם לא בשיא הבוקר (07:00-09:00)', icon: '🐟', lat: 37.5024, lng: 15.0873 },
      { time: '12:20', title: 'פיאצה דל דואומו + מזרקת הפיל (Piazza del Duomo / Fontana dell\'Elefante)', desc: 'סמל העיר', icon: '⛲', lat: 37.5023, lng: 15.0872 },
      { time: '13:15', title: 'ארוחת צהריים', desc: '~1.25 שעות', icon: '🍽️' },
      { time: '14:30', title: 'מנוחה / סיאסטה', desc: 'חנויות רבות סגורות בשעות אלו בכל מקרה', icon: '😌' },
      { time: '16:00', title: 'ויה אטנאה (Via Etnea)', desc: 'הרחוב הראשי, קניות ואווירה', icon: '🛍️', lat: 37.5064, lng: 15.0876 },
      { time: '17:30', title: 'וילה בליני (Villa Bellini)', desc: 'גנים יפים, לקראת שקיעה (~19:15)', icon: '🌳', lat: 37.5096, lng: 15.0916 },
      { time: '20:00', title: 'ארוחת ערב + גרניטה בפיסטוק', desc: 'ספסיאליטה מקומית - שווה לתכנן, גם לארוחת בוקר למחרת', icon: '🍧' },
      { time: '22:00', title: 'פיאצה בליני / ויה מונטסאנו (Piazza Bellini / Via Montesano)', desc: 'ברים, אווירת סטודנטים', icon: '🍹' },
    ],
    note: 'חניה: גם אם לא נוהגים היום, שווה לבחור מלון עם חניה/גראז\' קרוב - מהיום הבא כבר יש רכב.',
  },
  {
    num: 3, date: '2026-09-19', weekday: 'שבת', base: 'catania',
    title: 'טיול יום ברכב: אורטיג\'יה + נוטו', hasCar: true,
    items: [
      { time: '10:00', title: 'איסוף רכב - Sicily by Car קטניה עיר', desc: 'Via Monfalcone 1B, קטניה (לא בשדה - חוסך נסיעה מיותרת)', icon: '🚗', lat: 37.4995, lng: 15.0785 },
      { time: '10:30', title: 'נסיעה לאורטיג\'יה', desc: '~50 דק\'', icon: '🛣️' },
      { time: '11:20', title: 'אורטיג\'יה (Ortigia)', desc: 'האי ההיסטורי הקטן: פיאצה דואומו, מזרקת ארתוזה, שוק בוקר (עדיין פעיל בשבת), מסעדות דגים - כ-3 שעות הליכה רגועה', icon: '🏛️', base: 'ortigia', lat: 37.0587, lng: 15.2933 },
      { time: '14:30', title: 'ארוחת צהריים באורטיג\'יה', desc: '~1.5 שעות', icon: '🍽️', base: 'ortigia' },
      { time: '16:00', title: 'נסיעה לנוטו', desc: '~35 דק\' מאורטיג\'יה', icon: '🛣️' },
      { time: '16:35', title: 'נוטו (Noto)', desc: 'רחוב ראשי בארוקי מרשים - במיוחד יפה עם אור אחר הצהריים/שקיעה, כ-3 שעות', icon: '🏛️', base: 'noto', lat: 36.8909, lng: 15.0709 },
      { time: '19:30', title: 'חזרה לקטניה', desc: '~1 שעה', icon: '🛣️' },
    ],
  },
  {
    num: 4, date: '2026-09-20', weekday: 'ראשון', base: 'catania',
    title: 'קטניה ← טאורמינה', hasCar: true,
    items: [
      { time: '09:00', title: 'בוקר אחרון בקטניה', desc: 'מה שלא הספקתם ביום 2 - למשל טירת אורסינו, מונסטרו דיי בנדטיני', icon: '🏰' },
      { time: '12:00', title: 'צ\'ק-אאוט מהמלון', desc: '', icon: '🧳' },
      { time: '12:30', title: 'ארוחת צהריים', desc: '~1 שעה', icon: '🍽️' },
      { time: '13:30', title: 'נסיעה לטאורמינה', desc: '~45 דק\'', icon: '🛣️' },
      { time: '14:15', title: 'צ\'ק אין ב-Hotel Villa Paradiso (Via Roma 2)', desc: 'חניה במקום, מרכז העיר, גישה לחוף פרטי בלטויאני', icon: '🏨', base: 'taormina', lat: 37.8524, lng: 15.2880 },
      { time: '15:00', title: 'התאקלמות - חוף פרטי / מנוחה', desc: 'Nuova Spiaggia Paradiso בלטויאני', icon: '🏖️', base: 'taormina' },
      { time: '18:30', title: 'קורסו אומברטו (Corso Umberto)', desc: 'הרחוב הראשי', icon: '🚶', base: 'taormina', lat: 37.8528, lng: 15.2894 },
      { time: '19:00', title: 'פיאצה IX אפריל (Piazza IX Aprile)', desc: 'שקיעה עם נוף לים ולאטנה (~19:15)', icon: '🌅', base: 'taormina', lat: 37.8534, lng: 15.2889 },
    ],
  },
  {
    num: 5, date: '2026-09-21', weekday: 'שני', base: 'taormina',
    title: 'יום חופשי/רגוע בטאורמינה', hasCar: true,
    items: [
      { time: '10:00', title: 'ים - חוף פרטי בלטויאני / איזולה בלה (Letojanni / Isola Bella)', desc: 'חוף פרטי כלול ב-Nuova Spiaggia Paradiso בלטויאני, או איזולה בלה', icon: '🏖️', base: 'taormina', lat: 37.8459, lng: 15.2960 },
      { time: '15:00', title: 'טאורמינה בעצמה', desc: 'גני העיר, ואולי קפיצה לקסטלמולה (~20 דק\' נסיעה - עיירה קטנה עם נוף)', icon: '🏰', base: 'taormina', lat: 37.8656, lng: 15.2758 },
      { time: '20:00', title: 'ערב חופשי', desc: 'מנוחה לפני שני ימי היקב', icon: '😌' },
    ],
    note: 'יום בלי תכנון קשיח - מומלץ לא לתזמן שעות מדויקות.',
  },
  {
    num: 6, date: '2026-09-22', weekday: 'שלישי', base: 'taormina',
    title: 'טאורמינה → אלקנטרה → יקב Tenuta San Michele', hasCar: true,
    items: [
      { time: '09:00', title: 'צ\'ק-אאוט מ-Villa Paradiso', desc: 'טעינת מזוודות ברכב', icon: '🧳', base: 'taormina' },
      { time: '09:00', title: 'נסיעה לגולה דל אלקנטרה', desc: '~35 דק\'', icon: '🛣️' },
      { time: '09:35', title: 'גולה דל אלקנטרה (Gole dell\'Alcantara)', desc: 'קניון בזלת דרמטי, מדרכה לאורך הקניון ומדרגות/מעלית לנחל. סטייה מכוונת מהדרך הישירה ליקב - כ-2 שעות', icon: '🏞️', base: 'alcantara', lat: 37.8804, lng: 15.1734 },
      { time: '11:30', title: 'נסיעה לסנטה ונרינה', desc: '~55 דק\' עד Tenuta San Michele', icon: '🛣️' },
      { time: '12:25', title: 'ארוחת צהריים', desc: 'במקום או בדרך', icon: '🍽️' },
      { time: '13:30', title: 'צ\'ק-אין ב-Tenuta San Michele (Via Zafferana 13)', desc: 'התאקלמות, בריכה, סיור ביקב Murgo', icon: '🏨', base: 'santavenerina' },
      { time: '19:00', title: 'ארוחת ערב / טעימות יין', desc: 'במקום הלינה', icon: '🍷', base: 'santavenerina' },
    ],
  },
  {
    num: 7, date: '2026-09-23', weekday: 'רביעי', base: 'santavenerina',
    title: 'אטנה + יין - יום פנוי ביקב', hasCar: true,
    items: [
      { time: '09:00', title: 'נסיעה ל-Rifugio Sapienza', desc: 'יציאה מהיקב, צד דרומי - ~35 דק\'', icon: '🛣️' },
      { time: '09:40', title: 'רכבל + ג\'יפ עם מדריך (Funivia dell\'Etna)', desc: 'עד 2,500 מ\', המשך בג\'יפ 4X4 עד ~2,800-3,000 מ\' עם מדריך (כ-60 יורו, לבדוק מחיר מעודכן). הליכה קלה סביב המכתשים - כ-2.75 שעות בסך הכל', icon: '🚡', base: 'etna', lat: 37.7000, lng: 14.9958 },
      { time: '12:25', title: 'ארוחת צהריים', desc: 'באזור הרפוג\'יו', icon: '🍽️', base: 'etna' },
      { time: '13:25', title: 'נסיעה חזרה ליקב', desc: '~35 דק\'', icon: '🛣️' },
      { time: '14:00', title: 'בריכה ומנוחה', desc: 'ב-Tenuta San Michele', icon: '🏊', base: 'santavenerina' },
      { time: '19:00', title: 'טעימות יין נוספות + ארוחת ערב', desc: 'ב-Tenuta San Michele', icon: '🍷', base: 'santavenerina' },
    ],
  },
  {
    num: 8, date: '2026-09-24', weekday: 'חמישי', base: 'santavenerina',
    title: 'יקב → פלרמו', hasCar: true,
    items: [
      { time: '09:30', title: 'צ\'ק-אאוט מ-Tenuta San Michele', desc: 'טעינת מזוודות', icon: '🧳', base: 'santavenerina' },
      { time: '10:00', title: 'נהיגה לפלרמו', desc: '~2.5-3 שעות', icon: '🛣️' },
      { time: '13:00', title: 'ארוחת צהריים', desc: 'בדרך או בפלרמו', icon: '🍽️' },
      { time: '18:00', title: 'תדלוק לפני החזרה', desc: 'למלא דלק ליד וילגרציה די קריני / צ\'יניזי (~10 ק"מ מהשדה) - לשמור קבלה', icon: '⛽' },
      { time: '19:00', title: 'החזרת רכב - Sicily by Car שדה פלרמו', desc: 'לא במרכז העיר - נמנעים מנהיגה/חניה בעיר עצמה', icon: '🚗', base: 'palermo', lat: 38.1809, lng: 13.0910 },
      { time: '19:45', title: 'הסעה/רכבת/מונית למרכז פלרמו', desc: '~40-60 דק\'', icon: '🚆' },
      { time: '20:45', title: 'צ\'ק אין', desc: 'מומלץ ללון באזור מרכז היסטורי / קלסה / קוואטרו קנטי', icon: '🏨', base: 'palermo' },
      { time: '21:15', title: 'ארוחת ערב מאוחרת', desc: 'הגעה מאוחרת לעיר - ערב ראשון קליל', icon: '🌆', base: 'palermo' },
    ],
    note: 'החזרת הרכב אושרה בפועל ל-19:00 (מאוחר מהתכנון המקורי) - יש כמה שעות פנויות בפלרמו/בדרך בין 13:00-18:00 לפני ההחזרה, ומגיעים למרכז העיר רק בערב.',
  },
  {
    num: 9, date: '2026-09-25', weekday: 'שישי', base: 'palermo',
    title: 'פלרמו: שווקים + קפלה פלטינה', hasCar: false,
    items: [
      { time: '09:00', title: 'שוק באלארו (Mercato di Ballarò)', desc: 'הכי תוסס בבוקר מוקדם', icon: '🛒', base: 'palermo', lat: 38.1113, lng: 13.3572 },
      { time: '11:00', title: 'שוק ווצ\'יריה (Mercato della Vucciria)', desc: 'סמוך לבאלארו - אפשר לשלב עם ארוחת ביניים/סטריט פוד', icon: '🛒', base: 'palermo', lat: 38.1194, lng: 13.3617 },
      { time: '12:30', title: 'קפלה פלטינה (Cappella Palatina)', desc: 'פסיפסים ביזנטיים-נורמניים מדהימים. כדאי לבדוק שעות פתיחה מראש, לפעמים סגורה בצהריים', icon: '🕌', base: 'palermo', lat: 38.1113, lng: 13.3532 },
      { time: '14:00', title: 'ארוחת צהריים', desc: '', icon: '🍽️', base: 'palermo' },
      { time: '15:30', title: 'מנוחה / המשך הליכה בעיר העתיקה', desc: '', icon: '😌', base: 'palermo' },
      { time: '20:00', title: 'אזור קלסה / ווצ\'יריה (La Kalsa / Vucciria)', desc: 'מרכז חיי הלילה של פלרמו, כולל הסצנה הגאה (EXIT10&LOVE ועוד)', icon: '🍹', base: 'palermo' },
    ],
  },
  {
    num: 10, date: '2026-09-26', weekday: 'שבת', base: 'palermo',
    title: 'פלרמו: צ\'פאלו + מונריאלה', hasCar: false,
    items: [
      { time: '08:00', title: 'רכבת פלרמו → צ\'פאלו', desc: '~40-45 דק\'', icon: '🚆' },
      { time: '08:45', title: 'צ\'פאלו (Cefalù)', desc: 'קתדרלה נורמנית, חוף, טיילת, ואפשר הליכה לצוק (La Rocca) - כ-4.25 שעות', icon: '🏖️', base: 'cefalu', lat: 38.0400, lng: 14.0231 },
      { time: '13:00', title: 'רכבת חזרה לפלרמו', desc: '~40-45 דק\'', icon: '🚆' },
      { time: '14:00', title: 'ארוחת צהריים בפלרמו', desc: '', icon: '🍽️', base: 'palermo' },
      { time: '15:00', title: 'אוטובוס AST למונריאלה', desc: '~25-30 דק\' מפיאצה אינדיפנדנצה', icon: '🚌' },
      { time: '15:30', title: 'קתדרלת מונריאלה (Duomo di Monreale)', desc: 'פסיפסים ביזנטיים-נורמניים - כ-2 שעות', icon: '⛪', base: 'monreale', lat: 38.0819, lng: 13.2903 },
      { time: '17:30', title: 'אוטובוס חזרה לפלרמו', desc: '~25-30 דק\'', icon: '🚌' },
      { time: '20:00', title: 'ערב אחרון בעיר', desc: 'ארוחת ערב + חיי לילה', icon: '🍹', base: 'palermo' },
    ],
    note: 'אם זה מרגיש עמוס - עדיף לוותר על מונריאלה לטובת יום רגוע יותר בצ\'פאלו עצמה (חוף+עיירה), ולהשאיר אותה כ"אם יישאר זמן וכוח".',
  },
  {
    num: 11, date: '2026-09-27', weekday: 'ראשון', base: 'palermo',
    title: 'עזיבה', hasCar: false,
    items: [
      { time: '08:30', title: 'בוקר אחרון חופשי בפלרמו', desc: 'קפה, הליכה אחרונה, קניות אחרונות', icon: '☕', base: 'palermo' },
      { time: '11:00', title: 'צ\'ק-אאוט מהמלון', desc: '', icon: '🧳', base: 'palermo' },
      { time: '11:15', title: 'רכבת ישירה: פלרמו ← קטניה שדה תעופה', desc: '~3 שעות - לוודא שעה מדויקת קרוב למועד', icon: '🚆' },
      { time: '14:15', title: 'הגעה לתחנת קטניה שדה תעופה', desc: 'מעבר לטרמינל, זמן חופשי - ארוחה קלה/קניות', icon: '🚉', base: 'catania' },
      { time: '15:40', title: 'פתיחת דלפקי צ\'ק-אין', desc: 'כ-2 שעות לפני הטיסה', icon: '🎫' },
      { time: '17:40', title: 'טיסה W4 6527: קטניה ← תל אביב', desc: '', icon: '✈️', base: 'catania' },
      { time: '21:55', title: 'נחיתה בת"א', desc: '', icon: '🛬' },
    ],
    note: 'מרווח ביטחון: כ-3.5 שעות בין ההגעה לתחנת השדה לטיסה. אם הרכבת בפועל יוצאת בשעה שונה מ-11:15, להזיז את כל הבוקר בהתאם.',
  },
];

const TRIP_START_DATE = '2026-09-17';
const TRIP_END_DATE = '2026-09-27';
