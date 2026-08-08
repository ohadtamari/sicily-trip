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
    tip: 'טרטוריה בחנות היסטורית מ-1870 - טעמי פלרמו האותנטיים', closedDays: [],
  },
  {
    id: 'alivaru', name: 'Osteria Alivàru da Carlo Napoli', base: 'palermo', source: 'claude',
    area: 'רובע קלסה', address: 'Kalsa, Palermo',
    tip: 'מוביל ע"י "קרלו הנקניקן" - חומרי גלם מעולים', closedDays: [],
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
];

function wikimediaImgUrl(filename) {
  return 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(filename);
}

function googleMapsSearchUrl(name, area) {
  const q = encodeURIComponent(name + ' ' + area + ' Sicily');
  return 'https://www.google.com/maps/search/?api=1&query=' + q;
}
