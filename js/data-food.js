// נתוני עמוד האוכל: מסעדות (עמודה שמאלית) ומנות לסימון (עמודה ימנית)
// הערה: שעות פתיחה מבוססות על מחקר כללי ואינן מאומתות רשמית מול כל מסעדה -
// מומלץ לבדוק ב-Google Maps / להתקשר לפני ההגעה, בייחוד בסופ"ש ובחגים.
// closedDays משתמש בשמות ימים באנגלית: Sunday..Saturday
// source: מקור ההמלצה - ראו FOOD_SOURCES למטה. כשמוסיפים מסעדה חדשה, לציין מקור.

const FOOD_SOURCES = {
  claude: { label: 'קלוד', icon: '✦' },
  michelin: { label: 'מדריך מישלן', icon: '⭐' },
  friend: { label: 'המלצה מחבר', icon: '👥' },
  other: { label: 'מקור אחר', icon: '📌' },
};

const FOOD_PLACES = [
  {
    id: 'osteria-antica-marina', name: 'Osteria Antica Marina', base: 'catania', source: 'claude',
    area: 'La Pescheria (שוק הדגים)', address: 'Via Pardo 29, 95121 Catania',
    tip: 'פסטה בדיו של דיונון, פירות ים טריים - מומלצת מקומית כהתאמה מושלמת לשוק',
    closedDays: [],
  },
  {
    id: 'acqualavica', name: 'Osteria Acqualavica', base: 'catania', source: 'claude',
    area: 'ליד הדואומו ושוק הדגים', address: 'Via Cardinale Dusmet 35, 95121 Catania',
    tip: 'מסבאה ים-תיכונית בלב העיר', closedDays: ['Wednesday'],
  },
  {
    id: 'scirocco', name: 'Scirocco Sicilian Fish Lab', base: 'catania', source: 'claude',
    area: 'ליד שוק הדגים', address: 'Piazza Alonzo di Benedetto 7, Catania',
    tip: 'קלמארי מטוגן, כריכי דגים, פירות ים על האש', closedDays: [],
  },
  {
    id: 'ranieri', name: 'Ristorante Ranieri', base: 'ortigia', source: 'claude',
    area: 'אורטיג\'יה', address: 'Piazza San Giuseppe, 96100 Siracusa',
    tip: 'פירות ים טריים, שרימפס אדום סיציליאני בתפוז ובזיליקום - כדאי להזמין מקום מראש', closedDays: [],
  },
  {
    id: 'cortile-spirito-santo', name: 'Cortile Spirito Santo', base: 'ortigia', source: 'claude',
    area: 'אורטיג\'יה (מסעדת שף - יוקרתי)', address: 'Via Salomone 21, 96100 Siracusa',
    tip: 'מסעדה עם כוכב מישלן בתוך פלאצו מהמאה ה-17 - אופציה למי שרוצה לפנק', closedDays: [],
  },
  {
    id: 'caffe-sicilia', name: 'Caffè Sicilia', base: 'noto', source: 'claude',
    area: 'נוטו', address: 'Corso Vittorio Emanuele 125, 96017 Noto',
    tip: 'בית קפה היסטורי - גרניטת שקדים עם בריוש', closedDays: [],
  },
  {
    id: 'trattoria-carmine', name: 'Trattoria del Carmine', base: 'noto', source: 'claude',
    area: 'נוטו, רובע Carmine', address: 'Via Ducezio, Noto',
    tip: 'מטבח סיציליאני קלאסי במחיר הוגן', closedDays: [],
  },
  {
    id: 'da-nino', name: 'Trattoria da Nino', base: 'taormina', source: 'claude',
    area: 'טאורמינה', address: 'קרוב לקורסו אומברטו, טאורמינה',
    tip: 'מקומי ותיק משנת 1953 - פסטה אלה נורמה', closedDays: [],
  },
  {
    id: 'rosso-divino', name: 'Osteria Rosso Divino', base: 'taormina', source: 'claude',
    area: 'טאורמינה', address: 'קרוב לקורסו אומברטו, טאורמינה',
    tip: 'אוסטריה קטנה עם יין טוב, צעד מקורסו אומברטו', closedDays: [],
  },
  {
    id: 'vicolo-stretto', name: 'Vicolo Stretto', base: 'taormina', source: 'claude',
    area: 'טאורמינה, סמטה מקורסו אומברטו', address: 'טאורמינה',
    tip: 'פסטת פירות ים ויינות מקומיים', closedDays: [],
  },
  {
    id: 'gagini', name: 'Gagini Social Restaurant', base: 'palermo', source: 'claude',
    area: 'בין פיאצה מרינה לווצ\'יריה', address: 'Via Cassari, Palermo',
    tip: 'מטבח סיציליאני מעודכן, אווירה חברתית', closedDays: [],
  },
  {
    id: 'buatta', name: 'Buatta Cucina Popolana', base: 'palermo', source: 'claude',
    area: 'ליד שוק ווצ\'יריה', address: 'Palermo',
    tip: 'טרטוריה בחנות היסטורית מ-1870 - טעמי פלרמו האותנטיים (מומלץ גם ע"י גל)', closedDays: [],
  },
  {
    id: 'alivaru', name: 'Osteria Alivàru da Carlo Napoli', base: 'palermo', source: 'claude',
    area: 'רובע קלסה', address: 'Kalsa, Palermo',
    tip: 'מוביל ע"י "קרלו הנקניקן" - חומרי גלם מעולים', closedDays: [],
  },
  {
    id: 'cantine-murgo', name: 'Cantine Murgo (Tenuta San Michele)', base: 'santavenerina', source: 'claude',
    area: 'סנטה ונרינה, יקב על מדרונות האטנה', address: 'Via Zafferana 13, 95010 Santa Venerina',
    tip: 'יקב אגריטוריזמו עם יינות מבעבעים (מבוססי נרלו) - טעימות וארוחות במקום הלינה',
    closedDays: [],
  },
  // המלצות מאידן (חבר) - נאספו מקישורי Google Maps ששלח בוואטסאפ
  {
    id: 'etna-urban-winery', name: 'Etna Urban Winery', base: 'catania', source: 'friend',
    area: 'San Gregorio di Catania (מדרון האטנה)', address: 'Via Catira, 40, 95027 San Gregorio di Catania CT',
    tip: 'יקב וטעימות יין על מדרון האטנה (לא מסעדה קלאסית) - חבילות טעימה, אין תפריט בקר/עוף רגיל. שעות פתיחה מוגבלות (נסגר מוקדם בערב, נפתח שוב ביום ד\' ב-13:00) - יש להזמין מראש באתר etnaurbanwinery.it',
    closedDays: [],
  },
  {
    id: 'ristorante-da-antonio', name: 'Ristorante da Antonio', base: 'catania', source: 'friend',
    area: 'קטניה', address: 'Via Castello Ursino, 59, 95121 Catania CT',
    tip: 'איטלקי/דגים - יש גם סטייקים (בקר) בתפריט. דירוג גוגל 4.6 (3,128 ביקורות)',
    closedDays: [],
  },
  {
    id: 'bar-laudani', name: 'Bar Laudani', base: 'catania', source: 'friend',
    area: 'קטניה', address: 'Via Giuseppe Garibaldi, 135, 95121 Catania CT',
    tip: 'בר/קפה לארוחות בוקר וקלות - יש גם עוף בתפריט (מוזכר בביקורת: עוף עם תפוחי אדמה). תפריט קבוע ב-9€ (פסטה+חלבון+קינוח), טווח מחירים 1-10€ לאדם, פתוח עד 20:30',
    closedDays: [],
  },
  {
    id: 'sleto-pizzeria-hamburger', name: 'Sleto Pizzeria & Hamburger', base: 'catania', source: 'friend',
    area: 'קטניה', address: 'Piazza Turi Ferro, 5/6, 95124 Catania CT',
    tip: 'פיצרייה והמבורגרים - יש בקר (BBQ Burger בתפריט). טווח מחירים 10-20€ לאדם, פתוח עד 0:30 בלילה, עסק בבעלות אישה',
    closedDays: [],
  },
  {
    id: 'volu-pizza-contemporanea', name: 'Volù Pizza Contemporanea', base: 'catania', source: 'friend',
    area: 'קטניה', address: 'Via Sisto, 56, 95129 Catania CT',
    tip: 'פיצרייה עכשווית - לא ברור אם יש בקר/עוף בתפריט (בתפריט הפופולרי רק פיצות). טווח מחירים 10-20€, אפשר להזמין שולחן מראש (TheFork)',
    closedDays: [],
  },
  {
    id: 'planeta-sciaranuova', name: 'Planeta Sciaranuova', base: 'alcantara', source: 'friend',
    area: 'Castiglione di Sicilia (מדרון האטנה הצפוני)', address: 'Contrada Sciara Nuova, 95012 Castiglione di Sicilia CT',
    tip: 'יקב וטעימות יין (לא מסעדה רגילה) - אין תפריט בקר/עוף קלאסי. חוויה כוללת סיור בכרמים, טעימה אנכית של יינות אטנה ואפריטיף/ארוחת צהריים בקנטינה - דורש הזמנה מראש באתר Planeta.it',
    closedDays: [],
  },
  {
    id: 'al-saraceno', name: 'Al Saraceno (Ristorante al Saraceno)', base: 'taormina', source: 'friend',
    area: 'טאורמינה', address: 'Via Madonna della Rocca, 16/18, 98039 Taormina ME',
    tip: 'מסעדה איטלקית עם דגש על דגים ופסטה - לא ברור אם יש בקר/עוף בתפריט. טווח מחירים 30-60€, אפשר להזמין שולחן (Quandoo). נוף מהמם למפרץ, אך יש בעיית חנייה/גישה ברכב (דרך ללא מוצא)',
    closedDays: [],
  },
  {
    id: 'osteria-da-rita', name: 'Osteria da Rita (dal 1991)', base: 'taormina', source: 'friend',
    area: 'טאורמינה', address: 'Via Calapitrulli, 3, 98039 Taormina ME',
    tip: 'מסעדה סיציליאנית - מנות פופולריות: קפונטה, פסטה עם סרדינים, לא ברור אם יש בקר/עוף בתפריט. טווח מחירים 20-30€, יש לצפות לתור/המתנה לשולחן',
    closedDays: [],
  },
  {
    id: 'stritfud', name: 'stritFUD', base: 'taormina', source: 'friend',
    area: 'טאורמינה', address: 'Via G. di Giovanni, 23, 98039 Taormina ME',
    tip: 'מזון מהיר סיציליאני - ארנצ\'יני, פאנלה, ספינצ\'יונה. יתכן שיש בקר (אופציית ראגו לארנצ\'יני), לא מאושר בוודאות. טווח מחירים 1-10€ לאדם, יש אפשרויות טבעוניות/ללא גלוטן, עסק בבעלות אישה',
    closedDays: [],
  },
  {
    id: 'tantikkia', name: 'TANTìKKIA - cucina e vino', base: 'catania', source: 'friend',
    area: 'קטניה', address: 'V. Gisira, 28, 95121 Catania CT',
    tip: 'מסעדה עם דגש על דגים ופירות ים - יש גם בקר/אומצה (מוזכר בתגי התמונות). טווח מחירים 20-30€. יש ביקורת שלילית אחת ("רק דירוג ושיווק, האוכל בלי טעם") לצד ביקורות נלהבות רבות',
    closedDays: [],
  },
  {
    id: 'don-peppinu', name: 'Don Peppinu', base: 'catania', source: 'friend',
    area: 'קטניה', address: 'Via Etnea, 20, 95131 Catania CT',
    tip: 'גלידרייה (לא מסעדה) - אין בקר/עוף, קינוחים וגלידה בלבד. פתוח עד 2:00 בלילה, יש תור בשעות הערב',
    closedDays: [],
  },
  {
    id: 'bistro-uzeta', name: 'Bistro Uzeta (Uzeta Bistrò siciliano)', base: 'catania', source: 'friend',
    area: 'קטניה', address: 'Via Penninello, 41, 95124 Catania CT',
    tip: 'ביסטרו סיציליאני מודרני - יש בקר (פסטרמה מוזכרת בביקורת). טווח מחירים 20-40€, מומלץ להזמין שולחן מראש',
    closedDays: ['Tuesday'],
  },
  {
    id: 'la-gelsomina', name: 'La Gelsomina', base: 'santavenerina', source: 'friend',
    area: 'Presa (אזור האטנה)', address: 'Via San Giovanni Bosco, 26, 95017 Presa CT',
    tip: 'נראה כמו מקום לינה/אגריטוריזמו עם יקב (יש צ\'ק-אין/צ\'ק-אאוט ומחירי לילה ב-Booking.com) ולא מסעדה - אין מידע על בקר/עוף. כדאי לבדוק מול אידן אם התכוון לקישור אחר',
    closedDays: [],
  },
  {
    id: 'borgo-santo-spirito', name: 'Borgo Santo Spirito', base: 'alcantara', source: 'friend',
    area: 'Passopisciaro (מדרון האטנה הצפוני)', address: 'Contrada Santo Spirito, sn, 95012 Passopisciaro CT',
    tip: 'מסעדה איטלקית עם יין בית מהכרם שלהם - מנה מוזכרת היא פילה חזיר בפטריות פורצ\'יני, לא בקר/עוף. טווח מחירים 30-40€, ממוקמת בין יקבי האטנה',
    closedDays: [],
  },
  {
    id: 'le-tre-vie', name: 'Osteria Pizzeria Le Tre Vie', base: 'taormina', source: 'friend',
    area: 'טאורמינה', address: 'Via Crocefisso, 4, 98039 Taormina ME',
    tip: 'מסעדה ופיצרייה - יש בקר בתפריט (פילה בקר עם גבינת רגוזאנו). טווח מחירים 20-40€, אפשר להזמין שולחן מראש, הגישה למקום כוללת הליכה/מעלית חנייה',
    closedDays: [],
  },
  {
    id: 'al-giardino', name: 'Ristorante Al Giardino', base: 'taormina', source: 'friend',
    area: 'טאורמינה', address: 'Via Bagnoli Croci, 84, 98039 Taormina ME',
    tip: 'מסעדה סיציליאנית - מנות פופולריות: תמנון, ריזוטו, ארנצ\'יני (בעיקר דגים), לא ברור אם יש בקר/עוף. טווח מחירים 20-30€, מומלץ להזמין מראש כדי להימנע מהמתנה של 30-45 דקות',
    closedDays: [],
  },
  {
    id: 'bam-bar', name: 'Bam Bar', base: 'taormina', source: 'friend',
    area: 'טאורמינה', address: 'Via di Giovanni, 45, 98039 Taormina ME',
    tip: 'בר גרניטה וקינוחים קלאסי (לא מסעדה) - אין בקר/עוף, מתמחה בגרניטה ובריוש. טווח מחירים 1-10€, תורים ארוכים אופייניים בעיקר בבוקר/צהריים',
    closedDays: [],
  },
  {
    id: 'angolo-dei-sapori-bronte', name: 'L\'angolo dei Sapori Bronte', base: 'etna', source: 'friend',
    area: 'ברונטה (עיר הפיסטוק)', address: 'Via Duca degli Abruzzi, 13, 95034 Bronte CT',
    tip: 'קונדיטוריית פיסטוק בברונטה - לא מסעדה, אין בקר/עוף. יש טעימות וסיור במפעל, קנולי/ארנצ\'יני/ממתקי פיסטוק',
    closedDays: [],
  },
  // המלצות מגל (חברה) - נאספו מרשימת Google Maps משותפת "פלרמו המלצות"
  {
    id: 'nino-u-ballerino', name: "Nino 'u Ballerino", base: 'palermo', source: 'friend', friendName: 'גל',
    area: 'פלרמו', address: 'Corso Camillo Finocchiaro Aprile 76, 90138 Palermo',
    tip: 'מקום מפורסם לסנדוויץ׳ טחול שייחודי לפלרמו. לא היה בשבילי😥 יש בעוד מקומות', closedDays: [],
  },
  {
    id: 'segreti-chiostro', name: 'I Segreti del Chiostro', base: 'palermo', source: 'friend', friendName: 'גל',
    area: 'פלרמו, מנזר סנטה קטרינה', address: 'Via Discesa dei Giudici 33, 90133 Palermo',
    tip: 'מאפיה בתוך כנסיה (קנולי/עוגיות וכאלה לא לחם). ישיבה קצת צפופה בחצר אבל יפה שם', closedDays: [],
  },
  {
    id: 'le-angeliche', name: 'Le Angeliche', base: 'palermo', source: 'friend', friendName: 'גל',
    area: 'פלרמו, מאחורי שוק אל קאפו', address: 'Vicolo Abbadia 10-14, 90134 Palermo',
    tip: 'מסעדה טובה ושקטה עם חצר יפה', closedDays: [],
  },
  {
    id: 'cioccolateria-lorenzo', name: 'Cioccolateria Lorenzo', base: 'palermo', source: 'friend', friendName: 'גל',
    area: 'פלרמו, קלסה', address: 'Via del Quattro Aprile 7, 90133 Palermo',
    tip: 'קינוחים, פרלינים ושוקו טוב', closedDays: ['Monday'],
  },
  {
    id: 'galloway', name: 'Galloway', base: 'palermo', source: 'friend', friendName: 'גל',
    area: 'פלרמו, ליברטה', address: "Via Gabriele D'Annunzio 42, 90144 Palermo",
    tip: 'וייב של פאסט פוד אבל שווה לנסות - עוף שלם או חצי עוף בגריל', closedDays: [],
  },
  {
    id: 'radici-sicilia', name: 'Radici di Sicilia', base: 'palermo', source: 'friend', friendName: 'גל',
    area: 'פלרמו, ליד שוק אל קאפו וטאטרו מאסימו', address: "Via Sant'Agostino 95, Palermo",
    tip: 'אוכל קל אבל הכל מקומי (אולי טבעוני) ואווירה טובה', closedDays: [],
  },
  {
    id: 'cappadonia-politeama', name: 'Cappadonia Gelati (פוליטאמה)', base: 'palermo', source: 'friend', friendName: 'גל',
    area: 'פלרמו, ליד טאטרו פוליטאמה', address: 'Piazzetta Francesco Bagnasco 29, 90141 Palermo',
    tip: 'גלידריה מעולה (עוד סניף)', closedDays: [],
  },
  {
    id: 'cappadonia-centro', name: 'Cappadonia Gelati (מרכז העיר)', base: 'palermo', source: 'friend', friendName: 'גל',
    area: 'פלרמו, קורסו ויטוריו עמנואלה', address: 'Via Vittorio Emanuele 401, 90134 Palermo',
    tip: 'גלידריה מושלמת. יש מצב שהם המציאו את הגלידה בבריוש? לא בטוח', closedDays: [],
  },
  {
    id: 'caffetteria-corso', name: 'Caffetteria del Corso', base: 'palermo', source: 'friend', friendName: 'גל',
    area: 'פלרמו, קורסו ויטוריו עמנואלה', address: 'Via Vittorio Emanuele 370, 90134 Palermo',
    tip: 'גרניטה פיסטוק', closedDays: [],
  },
  {
    id: 'dal-barone', name: 'dal Barone', base: 'palermo', source: 'friend', friendName: 'גל',
    area: 'פלרמו, קלסה', address: 'Via Alessandro Paternostro 87, 90133 Palermo',
    tip: 'בר יין קטן וחמוד. יש מצב שתשבו ברחוב', closedDays: [],
  },
  {
    id: 'teco', name: 'TÈCO', base: 'palermo', source: 'friend', friendName: 'גל',
    area: 'פלרמו, קלסה', address: 'Via Giuseppe Garibaldi 68, 90133 Palermo',
    tip: 'בית תה. צוות חביב', closedDays: ['Monday'],
  },
  {
    id: 'sciampagna', name: 'Sciampagna', base: 'palermo', source: 'friend', friendName: 'גל',
    area: 'פלרמו, ליד פיאצה פוליטאמה', address: 'Via Riccardo Wagner 8/C, 90139 Palermo',
    tip: 'מאפיה (עוגות קטנות כאלה מפונפנות) שממש אהבתי. מעוצבת מחריד', closedDays: [],
  },
];

const FOOD_DISHES = [
  { id: 'arancini', name: 'Arancini', desc: 'כדורי אורז מטוגנים במילוי (רוטב בשר/גבינה/פיסטוק)', img: 'Arancini_002.jpg', emoji: '🍙' },
  { id: 'cannoli', name: 'Cannoli Siciliani', desc: 'גליל בצק פריך במילוי ריקוטה מתוקה', img: 'Cannoli_siciliani_al_Caffè_Impero,_ad_Alcamo.jpg', emoji: '🥐' },
  { id: 'granita-pistacchio', name: 'Granita al Pistacchio (Bronte)', desc: 'גרניטת פיסטוק - מומלץ עם בריוש לארוחת בוקר', img: 'Granita_Bronte.jpg', emoji: '🍧' },
  { id: 'pasta-norma', name: 'Pasta alla Norma', desc: 'פסטה עם חציל, רוטב עגבניות וריקוטה סלאטה', img: 'Pasta_alla_Norma_-_Wiki_Loves_Sicilia.jpg', emoji: '🍝' },
  { id: 'caponata', name: 'Caponata', desc: 'תבשיל חציל מתוק-חמוץ עם זיתים וצלרי', img: 'Caponata_(14049113982).jpg', emoji: '🍆' },
  { id: 'panelle', name: 'Panelle', desc: 'לביבות קמח חומוס מטוגנות (סטריט פוד פלרמיטני)', img: 'Panelle_in_Caltanissetta.jpg', emoji: '🫓' },
  { id: 'sfincione', name: 'Sfincione', desc: 'פיצה פלרמיטנית עבה עם בצל ואנשובי', img: 'Sfincione_palermitano.jpg', emoji: '🍕' },
  { id: 'cassata', name: 'Cassata Siciliana', desc: 'עוגת ריקוטה עם מרציפן ופירות מסוכרים', img: 'Cassatasiciliana.jpg', emoji: '🎂' },
  { id: 'busiate', name: 'Busiate al Pesto Trapanese', desc: 'פסטה מקומית עם פסטו עגבניות-שקדים', img: 'Busiate.jpg', emoji: '🍝' },
  { id: 'brioche-tuppo', name: 'Brioche col Tuppo', desc: 'בריוש מתוק עם "כיפה" - הבסיס הקלאסי לגרניטה', emoji: '🥐' },
  { id: 'sarde-beccafico', name: 'Sarde a Beccafico', desc: 'סרדינים ממולאים בפירורי לחם, צימוקים וצנוברים', emoji: '🐟' },
  { id: 'pane-meusa', name: 'Pane ca\' Meusa', desc: 'כריך טחול פלרמיטני קלאסי - לא לחלשי לב', emoji: '🥖' },
  { id: 'stigghiole', name: 'Stigghiole', desc: 'קרביים על האש - סטריט פוד קטני אותנטי', emoji: '🍢' },
  { id: 'cipollina', name: 'Cipollina', desc: 'מאפה בצק עלים מלוח במילוי רוטב עגבניות, גבינה ונקניק - קלאסיקת מאפייה סיציליאנית (בעיקר בקטניה)', emoji: '🥟' },
];

function wikimediaImgUrl(filename) {
  return 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(filename);
}

function googleMapsSearchUrl(name, area) {
  const q = encodeURIComponent(name + ' ' + area + ' Sicily');
  return 'https://www.google.com/maps/search/?api=1&query=' + q;
}
