// נתוני עמוד האוכל: מסעדות (עמודה שמאלית) ומנות לסימון (עמודה ימנית)
// הערה: שעות פתיחה מבוססות על מחקר כללי ואינן מאומתות רשמית מול כל מסעדה -
// מומלץ לבדוק ב-Google Maps / להתקשר לפני ההגעה, בייחוד בסופ"ש ובחגים.
// closedDays משתמש בשמות ימים באנגלית: Sunday..Saturday
// source: מקור ההמלצה - ראו FOOD_SOURCES למטה. כשמוסיפים מסעדה חדשה, לציין מקור.

const FOOD_SOURCES = {
  claude: { label: 'קלוד', icon: '✦' },
  michelin: { label: 'מדריך מישלן', icon: '⭐' },
  bib_gourmand: { label: 'מדריך מישלן - Bib Gourmand', icon: '😋' },
  friend: { label: 'המלצה מחבר', icon: '👥' },
  instagram: { label: 'המלצה מאינסטגרם', icon: '📸' },
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
    id: 'me-cumpari-turiddu', name: 'Me Cumpari Turiddu', base: 'catania', source: 'bib_gourmand',
    area: 'קטניה', address: 'Piazza Turi Ferro 36, 95124 Catania',
    tip: 'מסעדה בעיצוב וינטג\' (לשעבר מוסך/מחסן) - מטבח סיציליאני יצירתי מבוסס חומרי גלם מקומיים', closedDays: [],
  },
  // המלצות שי (מ-Wanderlog של הטיול, נבדקו 12/9/2026)
  {
    id: 'agatha-cafe-stesicoro', name: 'Agatha Cafè Cosy Bakery & Specialty Coffee', base: 'catania', source: 'friend', friendName: 'שי',
    area: 'קטניה, פיאצה סטסיקורו', address: "P.zza Stesicoro 13, 95124 Catania CT",
    tip: 'בית קפה קזואלי, פתוח 07:00-22:00 מדי יום - בורגרים, נקניקים, פלטת בשרים קרים, לצד אופציות צמחוניות. Walk-in מקובל, אין הזמנה מקוונת (רק טלפון: +39 351 389 7189). דירוג 3.5/5 (Tripadvisor)',
    closedDays: [],
  },
  {
    id: 'agatha-cafe-vittorio-veneto', name: 'Agatha Cafè Cosy Bakery (Viale Vittorio Veneto)', base: 'catania', source: 'friend', friendName: 'שי',
    area: 'קטניה', address: 'Viale Vittorio Veneto 181, 95125 Catania CT',
    tip: 'סניף חדש יחסית של אותה רשת - בראנץ\' ופלטות קטנות עם בשר, בדומה לסניף הראשי. Walk-in מקובל, אין הזמנה מקוונת. דירוג 7.7/10 "Very good" (Wheree)',
    closedDays: [],
  },
  {
    id: 'forma-catania', name: 'Forma', base: 'catania', source: 'friend', friendName: 'שי',
    area: 'קטניה', address: 'Via Pietro Garofalo 1, 95124 Catania CT',
    tip: 'פיצרייה/קפה קזואלי, פתוח 08:00-24:00 מדי יום - קרפצ\'ו בשר/עוף ובורגרים, לצד פיצה ומאפים. Walk-in מקובל, לא נמצאה הזמנה מקוונת ישירה. דירוג 3.9/5 (Tripadvisor)',
    closedDays: [],
  },
  {
    id: 'trattoria-del-cavaliere', name: 'Trattoria del Cavaliere', base: 'catania', source: 'friend', friendName: 'שי',
    area: 'קטניה', address: 'Via Paternò 11, 95131 Catania CT',
    tip: 'המלצת שי (בשם טלי - "מסעדה שטלי המליצה, טובה וזולה"). פתוח 11:00-00:00 מדי יום, תפריט בשר נפרד (Secondi di Carne, Involtini) לצד דגים. מומלץ להזמין מראש בערב - טלפון בלבד (095 310491), אין הזמנה מקוונת. מהפופולריות בעיר: כ-3,600 ביקורות, 3.8/5 (Tripadvisor)',
    closedDays: [],
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
    id: 'trattoria-la-foglia', name: 'Trattoria La Foglia', base: 'ortigia', source: 'claude',
    area: 'אורטיג\'יה', address: 'Ortigia, Siracusa',
    tip: 'טרטוריה מקומית - אין הזמנה מקוונת, רק בטלפון. ויתרנו על הזמנה מראש - ננסה Walk-in או נעצור בדרך',
    closedDays: [],
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
    tip: 'מקומי ותיק משנת 1953 - פסטה אלה נורמה. גם המלצת אינסטגרם לטאורמינה', closedDays: [],
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
  // המלצות שי (מ-Wanderlog של הטיול, נבדקו 12/9/2026)
  {
    id: 'otto-geleng', name: 'Otto Geleng Restaurant', base: 'taormina', source: 'friend', friendName: 'שי',
    area: "טאורמינה, מסעדת השף של מלון Belmond", address: 'Via Teatro Greco 59, 98039 Taormina ME',
    tip: 'כוכב מישלן 2026 - רק 16 מקומות ישיבה, הזמנה חובה מראש (SevenRooms באתר Belmond) כולל אימות כרטיס אשראי, אין Walk-in. חזיר נברודי שחור לצד דגים. דירוג 4.7/5 (Tripadvisor)',
    closedDays: [],
  },
  // הערה: ב-Wanderlog של הטיול מופיעה הזמנה קיימת ל-Otto Geleng ב-22.9 בשעה 18:00 שאינה שלכם - לוודא לפני הסתמכות
  {
    id: 'incanto-taormina', name: 'Incanto', base: 'taormina', source: 'friend', friendName: 'שי',
    area: 'טאורמינה, טרסת מלון הבוטיק Villa Ducale', address: 'Via Leonardo Da Vinci 60, 98039 Taormina ME',
    tip: 'נוף לשקיעה על המפרץ ואטנה - בעיקר דגים/ים תיכוני, יש גם קרוקטים של כבש. הזמנה מקוונת דרך TheFork, מומלץ מאוד להזמין מראש. #16 מתוך 239 מסעדות בטאורמינה, 4.7/5, Travelers\' Choice 2025 (538 ביקורות)',
    closedDays: [],
    bookings: [{ dayNum: 5, date: '2026-09-21', meal: 'ערב', time: '17:30', status: 'confirmed', method: 'אונליין - TheFork', note: 'הוקדם בכוונה לתפוס שקיעה - מ-18:00 המסעדה מתמלאת. תפריט Tapas and Bar, כולל מנת בשר' }],
  },
  // הערה: ב-Wanderlog של הטיול מופיעה הזמנה קיימת ל-Incanto ב-23.9 בשעה 19:00 שאינה שלכם - לוודא לפני הסתמכות
  {
    id: 'gagini', name: 'Gagini Social Restaurant', base: 'palermo', source: 'claude',
    area: 'בין פיאצה מרינה לווצ\'יריה', address: 'Via Cassari, Palermo',
    tip: 'מטבח סיציליאני מעודכן, אווירה חברתית', closedDays: [],
  },
  {
    id: 'buatta', name: 'Buatta Cucina Popolana', base: 'palermo', source: 'bib_gourmand',
    area: 'ליד שוק ווצ\'יריה', address: 'Via Vittorio Emanuele 176, 90133 Palermo',
    tip: 'טרטוריה בחנות היסטורית מ-1870 - טעמי פלרמו האותנטיים (מומלץ גם ע"י גל)', closedDays: [],
    bookings: [{ dayNum: 10, date: '2026-09-26', meal: 'ערב', time: '20:00', status: 'confirmed', method: 'אונליין - אתר ההזמנות של המסעדה (Superb Experience)' }],
  },
  {
    id: 'alivaru', name: 'Osteria Alivàru da Carlo Napoli', base: 'palermo', source: 'claude',
    area: 'רובע קלסה', address: 'Kalsa, Palermo',
    tip: 'מוביל ע"י "קרלו הנקניקן" - חומרי גלם מעולים', closedDays: [],
    bookings: [{ dayNum: 9, date: '2026-09-25', meal: 'ערב', time: '20:00', status: 'pending', method: 'מייל: osteriaalivaru@gmail.com', note: 'מייל נשלח - ממתינים לתשובת המסעדה' }],
  },
  {
    id: 'le-angeliche', name: 'Le Angeliche', base: 'palermo', source: 'friend', friendName: 'גל',
    area: 'בתוך שוק Mercato del Capo', address: 'Vicolo Abbadia 10-14, 90134 Palermo',
    tip: 'ביסטרו קומפורט בתוך שוק הקאפו - מטבח סיציליאני מסורתי עם חומרי גלם טריים מהשוק, חצר יפה ושקטה (מומלץ גם ע"י גל). פתוח ג\'-ש\' 09:00-23:00, א\' 09:00-15:00, סגור בשני',
    closedDays: ['Monday'],
    bookings: [{ dayNum: 9, date: '2026-09-25', meal: 'צהריים', time: '14:00', status: 'confirmed', method: 'טלפון: +39 375 687 4492 / מייל: info@leangeliche.it' }],
  },
  // המלצת שי (מ-Wanderlog של הטיול, נבדק 12/9/2026)
  {
    id: 'doba-restaurant-terrace', name: 'Doba Restaurant and Terrace', base: 'palermo', source: 'friend', friendName: 'שי',
    area: 'פלרמו, נוף מעל תיאטרון מסימו', address: "Via Bara All'Olivella 78, 90133 Palermo PA",
    tip: 'המלצת שי - "מסעדה בפלרמו עם נוף יפה מעל תיאטרון מסימו". פתוחה מ-18:00, הזמנה חובה לערב (dobarestaurant.it/prenota-un-tavolo), אין Walk-in. בעיקר דגים/ים תיכוני, יש גם מנות לא-דגים. דירוג 4.5/5 (130 ביקורות). בבדיקה מ-12.9 נראו 26.9 ו-27.9 סגורים/לא זמינים להזמנה אונליין - כדאי לוודא שוב בסמוך למועד, ייתכן שזה זמני',
    closedDays: [],
    bookings: [{ dayNum: 8, date: '2026-09-24', meal: 'ערב', time: '21:00', status: 'confirmed', method: 'אונליין - TheFork' }],
  },
  // הערה: ב-Wanderlog של הטיול מופיעה הזמנה קיימת ל-Doba ב-27.9 בשעה 20:30 לארבעה שאינה שלכם, ולפי הבדיקה התאריך הזה בכלל לא זמין להזמנה - לוודא לפני הסתמכות
  {
    id: 'cantine-murgo', name: 'Cantine Murgo (Tenuta San Michele)', base: 'santavenerina', source: 'claude', emoji: '🍷',
    area: 'סנטה ונרינה, יקב על מדרונות האטנה', address: 'Via Zafferana 13, 95010 Santa Venerina',
    tip: 'יקב אגריטוריזמו עם יינות מבעבעים (מבוססי נרלו) - טעימות וארוחות במקום הלינה',
    closedDays: [],
    bookings: [
      { dayNum: 6, date: '2026-09-22', meal: 'ערב', time: 'סביב 19:00', status: 'confirmed', label: 'Sparkling Wine Experience', method: 'הודעת ווטסאפ לבית ההארחה (אין הזמנה מקוונת)', note: 'מגיעה עם קרש נקניקים/גבינות בלבד (לא ארוחה מלאה) - כדאי לוודא שיש מספיק בשר' },
      { dayNum: 7, date: '2026-09-23', meal: 'ערב', time: 'סביב 19:00', status: 'confirmed', label: 'Food and Wine Experience (5 יינות)', method: 'הודעת ווטסאפ לבית ההארחה (אין הזמנה מקוונת)' },
    ],
  },
  // המלצות מאידן (חבר) - נאספו מקישורי Google Maps ששלח בוואטסאפ
  {
    id: 'etna-urban-winery', name: 'Etna Urban Winery', base: 'catania', source: 'friend', emoji: '🍷',
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
    id: 'volu-pizza-contemporanea', name: 'Volù Pizza Contemporanea', base: 'catania', source: 'friend', emoji: '🍕',
    area: 'קטניה', address: 'Via Sisto, 56, 95129 Catania CT',
    tip: 'פיצרייה עכשווית - לא ברור אם יש בקר/עוף בתפריט (בתפריט הפופולרי רק פיצות). טווח מחירים 10-20€, אפשר להזמין שולחן מראש (TheFork)',
    closedDays: [],
  },
  {
    id: 'planeta-sciaranuova', name: 'Planeta Sciaranuova', base: 'alcantara', source: 'friend', emoji: '🍷',
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
    id: 'don-peppinu', name: 'Don Peppinu', base: 'catania', source: 'friend', emoji: '🍨',
    area: 'קטניה', address: 'Via Etnea, 20, 95131 Catania CT',
    tip: 'גלידרייה (לא מסעדה) - אין בקר/עוף, קינוחים וגלידה בלבד. פתוח עד 2:00 בלילה, יש תור בשעות הערב',
    closedDays: [],
  },
  {
    id: 'bistro-uzeta', name: 'Bistro Uzeta (Uzeta Bistrò siciliano)', base: 'catania', source: 'friend',
    area: 'קטניה', address: 'Via Penninello, 41, 95124 Catania CT',
    tip: 'ביסטרו סיציליאני מודרני - יש בקר (פסטרמה מוזכרת בביקורת). טווח מחירים 20-40€, מומלץ להזמין שולחן מראש',
    closedDays: ['Tuesday'],
    bookings: [{ dayNum: 2, date: '2026-09-18', meal: 'ערב', time: '20:00', status: 'confirmed', method: 'אונליין - אתר ההזמנות של המסעדה (Superb Experience)' }],
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
    id: 'bam-bar', name: 'Bam Bar', base: 'taormina', source: 'friend', emoji: '🍧',
    area: 'טאורמינה', address: 'Via di Giovanni, 45, 98039 Taormina ME',
    tip: 'בר גרניטה וקינוחים קלאסי (לא מסעדה) - אין בקר/עוף, מתמחה בגרניטה ובריוש. טווח מחירים 1-10€, תורים ארוכים אופייניים בעיקר בבוקר/צהריים. גם המלצת אינסטגרם לטאורמינה',
    closedDays: [],
  },
  // המלצות אינסטגרם לטאורמינה
  {
    id: 'rosticceria-da-cristina', name: 'Rosticceria Da Cristina', base: 'taormina', source: 'instagram',
    area: 'טאורמינה', address: 'Via Giovanni Di Giovanni 28, 98039 Taormina ME',
    tip: 'רוסטיצריה/מזון מהיר משנת 1980 - ארנצ\'יני ופיצות עם חומרי גלם מקומיים. המלצת אינסטגרם לטאורמינה',
    closedDays: [],
  },
  {
    id: 'nove-taormina', name: 'Novè', base: 'taormina', source: 'instagram', emoji: '🍨',
    area: 'טאורמינה', address: 'Via Giovanni Di Giovanni 27, 98039 Taormina ME',
    tip: 'גלידריה ומוצרים טיפוסיים עם פיסטוק מברונטה - המלצת אינסטגרם לטאורמינה (יש לוודא שם/מיקום מדויק לפני ההגעה)',
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
    id: 'nino-u-ballerino', name: "Nino 'u Ballerino", base: 'palermo', source: 'friend', friendName: 'גל', emoji: '🥖',
    area: 'פלרמו', address: 'Corso Camillo Finocchiaro Aprile 76, 90138 Palermo',
    tip: 'מקום מפורסם לסנדוויץ׳ טחול שייחודי לפלרמו. לא היה בשבילי😥 יש בעוד מקומות', closedDays: [],
  },
  {
    id: 'segreti-chiostro', name: 'I Segreti del Chiostro', base: 'palermo', source: 'friend', friendName: 'גל',
    area: 'פלרמו, מנזר סנטה קטרינה', address: 'Via Discesa dei Giudici 33, 90133 Palermo',
    tip: 'מאפיה בתוך כנסיה (קנולי/עוגיות וכאלה לא לחם). ישיבה קצת צפופה בחצר אבל יפה שם', closedDays: [],
  },
  {
    id: 'cioccolateria-lorenzo', name: 'Cioccolateria Lorenzo', base: 'palermo', source: 'friend', friendName: 'גל', emoji: '🍫',
    area: 'פלרמו, קלסה', address: 'Via del Quattro Aprile 7, 90133 Palermo',
    tip: 'קינוחים, פרלינים ושוקו טוב', closedDays: ['Monday'],
  },
  {
    id: 'galloway', name: 'Galloway', base: 'palermo', source: 'friend', friendName: 'גל', emoji: '🍗',
    area: 'פלרמו, ליברטה', address: "Via Gabriele D'Annunzio 42, 90144 Palermo",
    tip: 'וייב של פאסט פוד אבל שווה לנסות - עוף שלם או חצי עוף בגריל', closedDays: [],
  },
  {
    id: 'radici-sicilia', name: 'Radici di Sicilia', base: 'palermo', source: 'friend', friendName: 'גל',
    area: 'פלרמו, ליד שוק אל קאפו וטאטרו מאסימו', address: "Via Sant'Agostino 95, Palermo",
    tip: 'אוכל קל אבל הכל מקומי (אולי טבעוני) ואווירה טובה', closedDays: [],
  },
  {
    id: 'cappadonia-politeama', name: 'Cappadonia Gelati (פוליטאמה)', base: 'palermo', source: 'friend', friendName: 'גל', emoji: '🍨',
    area: 'פלרמו, ליד טאטרו פוליטאמה', address: 'Piazzetta Francesco Bagnasco 29, 90141 Palermo',
    tip: 'גלידריה מעולה (עוד סניף)', closedDays: [],
  },
  {
    id: 'cappadonia-centro', name: 'Cappadonia Gelati (מרכז העיר)', base: 'palermo', source: 'friend', friendName: 'גל', emoji: '🍨',
    area: 'פלרמו, קורסו ויטוריו עמנואלה', address: 'Via Vittorio Emanuele 401, 90134 Palermo',
    tip: 'גלידריה מושלמת. יש מצב שהם המציאו את הגלידה בבריוש? לא בטוח', closedDays: [],
  },
  {
    id: 'caffetteria-corso', name: 'Caffetteria del Corso', base: 'palermo', source: 'friend', friendName: 'גל',
    area: 'פלרמו, קורסו ויטוריו עמנואלה', address: 'Via Vittorio Emanuele 370, 90134 Palermo',
    tip: 'גרניטה פיסטוק', closedDays: [],
  },
  {
    id: 'dal-barone', name: 'dal Barone', base: 'palermo', source: 'friend', friendName: 'גל', emoji: '🍷',
    area: 'פלרמו, קלסה', address: 'Via Alessandro Paternostro 87, 90133 Palermo',
    tip: 'בר יין קטן וחמוד. יש מצב שתשבו ברחוב', closedDays: [],
  },
  {
    id: 'teco', name: 'TÈCO', base: 'palermo', source: 'friend', friendName: 'גל', emoji: '🍵',
    area: 'פלרמו, קלסה', address: 'Via Giuseppe Garibaldi 68, 90133 Palermo',
    tip: 'בית תה. צוות חביב', closedDays: ['Monday'],
  },
  {
    id: 'sciampagna', name: 'Sciampagna', base: 'palermo', source: 'friend', friendName: 'גל', emoji: '🧁',
    area: 'פלרמו, ליד פיאצה פוליטאמה', address: 'Via Riccardo Wagner 8/C, 90139 Palermo',
    tip: 'מאפיה (עוגות קטנות כאלה מפונפנות) שממש אהבתי. מעוצבת מחריד', closedDays: [],
  },
  // רשת Sfrigola - ארנצ'יני מוכנים במקום, טריים לפי הזמנה (סניפים רשמיים מ-sfrigola.it)
  {
    id: 'sfrigola-calatafimi', name: 'Sfrigola - Corso Calatafimi', base: 'palermo', source: 'claude', emoji: '🍙',
    area: 'פלרמו, ליד פיאצה אינדיפנדנצה', address: 'Corso Calatafimi 11, 90129 Palermo',
    tip: 'רשת ארנצ\'יני סיציליאנית - מכינים ומטגנים לפי הזמנה מול הלקוח', closedDays: [],
  },
  {
    id: 'sfrigola-maqueda', name: 'Sfrigola - Via Maqueda', base: 'palermo', source: 'claude', emoji: '🍙',
    area: 'פלרמו, ויה מקדה', address: 'Via Maqueda 223, 90133 Palermo',
    tip: 'סניף נוסף של Sfrigola, קרוב יותר למרכז ולקוואטרו קנטי', closedDays: [],
  },
  {
    id: 'sfrigola-cefalu', name: 'Sfrigola - Cefalù', base: 'cefalu', source: 'claude', emoji: '🍙',
    area: 'צ\'פאלו, קורסו רוג\'רו', address: 'Corso Ruggero 53, 90015 Cefalù',
    tip: 'סניף Sfrigola בצ\'פאלו - נוח לעצור בדרך/מהחוף', closedDays: [],
  },

  // אופציות עצירה מהירה ביום הנסיעה לפלרמו (יום 8) - על ציר הכביש A19
  {
    id: 'mcdonalds-enna', name: "McDonald's Enna (McDrive)", base: 'a19route', source: 'other', emoji: '🍔',
    area: 'אנה - כ-45 דק\' נהיגה מסנטה ונרינה, בערך באמצע הדרך לפלרמו', address: 'Via Libero Grassi 16F-16M, 94100 Enna',
    tip: 'עצירה מהירה עם מקדראייב - נקודת עצירה נוחה כשליש-מחצית מהדרך לפלרמו', closedDays: [],
  },
  {
    id: 'mcdonalds-termini-imerese', name: "McDonald's - Autogrill Caracoli Nord", base: 'a19route', source: 'other', emoji: '🍔',
    area: 'תחנת שירות A19, ק"מ 164 (כיוון פלרמו), ליד טרמיני אימרזה', address: 'Autostrada A19 Palermo-Catania km 164, Termini Imerese',
    tip: 'תחנת אוטוגריל בתוך הכביש (לא צריך לרדת לעיר) - קרוב יותר לקצה הפלרמיטני של הנסיעה', closedDays: [],
  },
];

// סופרמרקטים ליד מקומות הלינה - מקור: מסמך מחקר (AI) שהמשתמש סיפק, מבוסס על קואורדינטות גוגל מפות.
// מרחקים/שעות משוערים - כדאי לוודא בזמן אמת דרך גוגל מפות אם זה קריטי.
const SUPERMARKETS = [
  {
    base: 'catania',
    options: [
      { name: 'Molla Alimentari', address: 'Via Vittorio Emanuele II, 132', distance: '~340 מ\' (4-5 דק\' הליכה, אותו רחוב)', hours: '08:00-24:00, כל יום כולל ראשון', recommended: true, lat: 37.5031278, lng: 15.0900582 },
      { name: 'Alimentari Licciardello', address: 'Via Vittorio Emanuele II, 89', distance: '~470 מ\'', hours: '08:30-14:00, 16:30-21:30 (חול-שבת), סגור ראשון' },
      { name: 'Essalam Market (חלאל)', address: 'Via Vittorio Emanuele II, 61', distance: '~450 מ\'', hours: '09:00-14:00/20:30 (משתנה לפי יום), פתוח גם ראשון' },
    ],
    tip: 'Molla Alimentari - הכי קרוב וגם הכי נדיב בשעות.',
  },
  {
    base: 'taormina',
    options: [
      { name: "Bottega Manago'", address: 'Via Calapitrulli, 16', distance: '~90 מ\' (הכי קרוב)', hours: '07:30-22:30, סגור בימי שני', recommended: true, lat: 37.8525192, lng: 15.2882831 },
      { name: 'Mini Market "Da Nina"', address: 'SP10', distance: '~320 מ\'', hours: '09:00-24:00, כל יום כולל ראשון' },
      { name: 'InCoop', address: 'Via Cappuccini, 3', distance: '~380 מ\'', hours: '07:30-22:30, כל יום' },
    ],
    tip: 'Bottega Manago\' לרוב הימים (הכי קרוב), Mini Market Da Nina כגיבוי בימי שני (כשמנגו סגור) או לשעות מאוחרות.',
  },
  {
    base: 'santavenerina',
    note: 'אזור כפרי - אין שום דבר ממש קרוב, צריך רכב.',
    options: [
      { name: 'Tabacchi Alimentari Edicola Russo Salvatore', address: 'Via Vittorio Emanuele, 360', distance: '~1 ק"מ', hours: '06:00-14:00, 16:00-20:30 (חול-שבת), 07:30-13:30 ראשון', recommended: true, lat: 37.6850385, lng: 15.1331842 },
      { name: 'Sapori della Natura', address: 'Via Martoglio, 14', distance: '~1.1 ק"מ', hours: '08:30-13:30, 16:00-20:30' },
      { name: 'Supermercato Decò', address: 'Via Mazzini, 61', distance: '~1.6 ק"מ', hours: '08:30-20:30 (חול-שבת), 08:30-13:00 ראשון' },
      { name: 'CONAD', address: 'Via Umberto, 16/M', distance: '~1.7 ק"מ', hours: '08:30-20:30 (חול-שבת), 08:30-13:30 ראשון' },
    ],
    tip: 'Tabacchi Alimentari Russo Salvatore - הכי קרוב וגם פותח הכי מוקדם (06:00).',
  },
  {
    base: 'palermo',
    options: [
      { name: 'Famila Superstore', address: 'Salita Partanna, 1', distance: '~240 מ\' (3 דק\' הליכה)', hours: '08:00-21:00 (חול-שבת), 08:00-20:30 ראשון', recommended: true, lat: 38.1169708, lng: 13.3681121 },
      { name: 'Fresko Supermercati', address: 'Via Roma, 294', distance: '~340 מ\'', hours: '08:30-20:30, כל יום כולל ראשון' },
      { name: 'Quick Sisa Supermercato', address: 'Vicolo I Monteleone, 11', distance: '~540 מ\'', hours: '08:30-20:00 (חול-שבת), 09:00-13:00 ראשון' },
    ],
    tip: 'Famila Superstore - הכי קרוב, גדול ונדיב בשעות.',
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
  { id: 'brioche-tuppo', name: 'Brioche col Tuppo', desc: 'בריוש מתוק עם "כיפה" - הבסיס הקלאסי לגרניטה', img: 'Brioche col Tuppo.jpg', emoji: '🥐' },
  { id: 'sarde-beccafico', name: 'Sarde a Beccafico', desc: 'סרדינים ממולאים בפירורי לחם, צימוקים וצנוברים', img: 'Sarde a beccafico.jpg', emoji: '🐟' },
  { id: 'pane-meusa', name: 'Pane ca\' Meusa', desc: 'כריך טחול פלרמיטני קלאסי - לא לחלשי לב', img: 'Pani ca meusa.jpg', emoji: '🥖' },
  { id: 'stigghiole', name: 'Stigghiole', desc: 'קרביים על האש - סטריט פוד קטני אותנטי', img: 'Stigghiole.jpg', emoji: '🍢' },
  { id: 'cipollina', name: 'Cipollina', desc: 'מאפה בצק עלים מלוח במילוי רוטב עגבניות, גבינה ונקניק - קלאסיקת מאפייה סיציליאנית (בעיקר בקטניה)', img: 'Cipollina.jpg', emoji: '🥟' },
  { id: 'sarti-spritz', name: 'Sarti Spritz', desc: 'ספריץ איטלקי פירותי - פרוסקו, סארטי רוזה (עם תפוז דם סיציליאני, מנגו ופסיפלורה) וסודה', img: 'https://www.sartiaperitivo.com/app/uploads/2025/01/sarti_spritz_mobile.webp', emoji: '🍹' },
  { id: 'iris', name: 'Iris', desc: 'מאפה פלרמיטני - בריוש מטוגן במילוי ריקוטה מתוקה, מצופה פירורי לחם', img: 'Iris_cioccolato_e_panna_2.jpg', emoji: '🍩' },
  { id: 'brontella', name: 'Brontella', desc: 'מאפה משויך לעיר ברונטה - בצק פריך במילוי קרם פיסטוק עשיר מפיסטוק ברונטה המפורסם', img: 'https://vangus-cdn.com/betenmelea.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-16-at-15.52.41.jpeg', emoji: '🥜' },
  { id: 'seltz', name: 'Seltz Limone e Sale', desc: 'סודה עם לימון ומלח - משקה מרענן קלאסי בדרום איטליה', img: 'https://vangus-cdn.com/betenmelea.com/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-25-at-09.02.06-e1784960510916.jpeg', emoji: '🥤' },
  { id: 'cassatella-santagata', name: 'Cassatella di Sant\'Agata', desc: 'מאפה בצורת חזה לכבוד חגיגת סנט אגאתה בקטניה - ריקוטה מתוקה מצופה סוכר וקישוט דובדבן', img: "Cassatella di Sant'Agata (Catania) 27 07 2025 02.jpg", emoji: '🧁' },
  { id: 'genovesi-erice', name: 'Genovesi di Erice', desc: 'מאפה בצק פריך במילוי קרם פטיסייר - קלאסיקת ארוחת בוקר מאריצ\'ה', img: 'Genovesi di Erice.jpg', emoji: '🥐' },
  { id: 'scacciata', name: 'Scacciata', desc: 'פוקאצ\'ה סיציליאנית ממולאת (ברוקולי/נקניק/גבינה/אנשובי) - סטריט פוד קטני קלאסי', img: 'Scaccia.jpg', emoji: '🥙' },
  { id: 'cassatina-siciliana', name: 'Cassatina Siciliana', desc: 'קסאטה בגרסה זעירה ואישית - אותו טעם קלאסי בנגיסה אחת', img: 'Cassatina siciliana.jpg', emoji: '🍰' },
  { id: 'vino-mandorla', name: 'Vino alla Mandorla', desc: 'יין שקדים מתוק סיציליאני - אפריטיף/דיג\'סטיף מקומי', img: 'https://www.tipicosiciliano.com/1461-large_default/vino-alla-mandorla.jpg', emoji: '🍷' },
  { id: 'brioche-gelato', name: 'Brioche col Gelato', desc: 'בריוש ממולא גלידה - קינוח קיץ סיציליאני קלאסי', img: 'Brioche gelato con panna.jpg', emoji: '🍦' },
];

function wikimediaImgUrl(filename) {
  return 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(filename);
}

function googleMapsSearchUrl(name, area) {
  const q = encodeURIComponent(name + ' ' + area + ' Sicily');
  return 'https://www.google.com/maps/search/?api=1&query=' + q;
}
