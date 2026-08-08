// נתוני תחבורה: איסוף/החזרת רכב, נסיעות בין הימים, תדלוק

const CAR_RENTAL = {
  company: 'Sixt',
  pickup: {
    label: 'איסוף רכב', dayNum: 3,
    place: 'Sixt קטניה עיר (לא בשדה)',
    address: 'Via Monfalcone 1B, 95127 Catania',
    note: '~500 מ\' מתחנת המטרו Catania Europa. איסוף בעיר חוסך נסיעה מיותרת לשדה.',
    lat: 37.4995, lng: 15.0785,
  },
  return: {
    label: 'החזרת רכב', dayNum: 8,
    place: 'Sixt שדה התעופה פלרמו (Punta Raisi)',
    address: 'Località Punta Raisi, Sala Arrivi, 90040 Cinisi (PA)',
    note: 'להחזיר בשדה - לא במרכז פלרמו, נמנעים מנהיגה/חניה בעיר.',
    lat: 38.1809, lng: 13.0910,
  },
  reminders: [
    'רכב אוטומטי - לוודא בהזמנה שזה מצוין במפורש, לא כל הסוכנויות מספקות אוטומט כברירת מחדל באיטליה',
    'one-way fee (איסוף בקטניה, החזרה בפלרמו) - לבדוק עלות מדויקת מול Sixt לפני ההזמנה',
    'חניה בטאורמינה: לבדוק מראש מול המלון/דירה - המרכז ההיסטורי הוא ZTL',
  ],
};

const GAS_STATIONS = [
  {
    dayNum: 8, name: 'תדלוק לפני החזרה בשדה פלרמו', area: 'Villagrazia di Carini / Cinisi',
    note: 'אין תחנת דלק בתוך השדה עצמו. למלא דלק מלא ~10 ק"מ לפני השדה (איזור וילגרציה די קריני / צ\'יניזי - ERG / Eni), ולשמור קבלה כהוכחה.',
  },
  {
    dayNum: 7, name: 'חניון Rifugio Sapienza (אטנה)', area: 'צד דרומי של האטנה',
    note: 'חניון בתשלום (~5 יורו לחצי יום), מזין מספר רישוי בעמדה. כדאי להגיע מוקדם בעונה עמוסה.',
  },
];

const DRIVES = [
  { fromDay: 3, from: 'קטניה', to: 'אורטיג\'יה', duration: '~50 דק\'' },
  { fromDay: 3, from: 'אורטיג\'יה', to: 'נוטו', duration: '~35 דק\'' },
  { fromDay: 3, from: 'נוטו', to: 'קטניה', duration: '~1 שעה' },
  { fromDay: 4, from: 'קטניה', to: 'טאורמינה', duration: '~45 דק\'' },
  { fromDay: 6, from: 'טאורמינה', to: 'נחל אלקנטרה', duration: '~30-40 דק\'' },
  { fromDay: 6, from: 'נחל אלקנטרה', to: 'סנטה ונרינה (יקב)', duration: '~1-1.5 שעות' },
  { fromDay: 7, from: 'סנטה ונרינה (יקב)', to: 'Rifugio Sapienza (אטנה)', duration: '~30-40 דק\'' },
  { fromDay: 8, from: 'סנטה ונרינה (יקב)', to: 'פלרמו (שדה תעופה)', duration: '~2.5-3 שעות' },
  { fromDay: 8, from: 'שדה פלרמו', to: 'מרכז פלרמו', duration: '~40-60 דק\' (הסעה/רכבת/מונית)' },
  { fromDay: 10, from: 'פלרמו', to: 'מונריאלה', duration: '~30 דק\' (אוטובוס)' },
  { fromDay: 10, from: 'פלרמו', to: 'צ\'פאלו', duration: '~45-60 דק\' (רכבת אזורית)' },
  { fromDay: 11, from: 'פלרמו', to: 'קטניה שדה תעופה', duration: '~3 שעות (רכבת ישירה)' },
];
