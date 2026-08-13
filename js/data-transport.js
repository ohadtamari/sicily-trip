// נתוני תחבורה: איסוף/החזרת רכב, נסיעות בין הימים, תדלוק

const CAR_RENTAL = {
  company: 'Sicily by Car',
  pickup: {
    label: 'איסוף רכב', dayNum: 3, date: '2026-09-19', time: '10:00',
    place: 'Sicily by Car - Catania Downtown',
    address: 'Via Monfalcone 1B, Catania, Italy 95127',
    note: '~500 מ\' מתחנת המטרו Catania Europa. איסוף בעיר חוסך נסיעה מיותרת לשדה.',
    lat: 37.4995, lng: 15.0785,
  },
  return: {
    label: 'החזרת רכב', dayNum: 8, date: '2026-09-24', time: '19:00',
    place: 'Sicily by Car - Palermo Airport',
    address: 'Località Punta Raisi, Cinisi, Italy 90045',
    note: 'להחזיר בשדה - לא במרכז פלרמו, נמנעים מנהיגה/חניה בעיר. החזרה מאוחרת (19:00) משאירה זמן פנוי משמעותי ביום המעבר.',
    lat: 38.1809, lng: 13.0910,
  },
  reminders: [
    'רכב אוטומטי - לוודא בהזמנה שזה מצוין במפורש, לא כל הסוכנויות מספקות אוטומט כברירת מחדל באיטליה',
    'one-way fee (איסוף בקטניה, החזרה בפלרמו) - לוודא מול Sicily by Car שהחיוב בפועל תואם את ההזמנה',
    'חניה בטאורמינה: לא רלוונטי יותר - Villa Paradiso כולל חניה במקום',
    'יום 22/9: יום נסיעה משמעותי (אלקנטרה + נסיעה ליקב) - לצאת מוקדם יחסית ולא לדחוס עוד אתרים',
    'יום 27/9: מרווח ביטחון של כ-3.5 שעות בין הרכבת לטיסה - יציאה מפלרמו מתוכננת ל-11:15, לאמת מול לוח הזמנים המדויק סמוך למועד הנסיעה',
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
  { fromDay: 3, from: 'קטניה', to: 'אורטיג\'יה', duration: '~50 דק\'', toLat: 37.0587, toLng: 15.2933 },
  { fromDay: 3, from: 'אורטיג\'יה', to: 'נוטו', duration: '~35 דק\'', toLat: 36.8909, toLng: 15.0709 },
  { fromDay: 3, from: 'נוטו', to: 'קטניה', duration: '~1 שעה', toLat: 37.5079, toLng: 15.0830 },
  { fromDay: 4, from: 'קטניה', to: 'טאורמינה', duration: '~45 דק\'', toLat: 37.8516, toLng: 15.2853 },
  { fromDay: 6, from: 'טאורמינה', to: 'נחל אלקנטרה', duration: '~35 דק\'', toLat: 37.8804, toLng: 15.1734 },
  { fromDay: 6, from: 'נחל אלקנטרה', to: 'סנטה ונרינה (יקב)', duration: '~55 דק\'', toLat: 37.6980, toLng: 15.1330 },
  { fromDay: 7, from: 'סנטה ונרינה (יקב)', to: 'Rifugio Sapienza (אטנה)', duration: '~35 דק\'', toLat: 37.7000, toLng: 14.9958 },
  { fromDay: 7, from: 'Rifugio Sapienza (אטנה)', to: 'סנטה ונרינה (יקב)', duration: '~35 דק\'', toLat: 37.6980, toLng: 15.1330 },
  { fromDay: 8, from: 'סנטה ונרינה (יקב)', to: 'פלרמו (שדה תעופה)', duration: '~2.5-3 שעות', toLat: 38.1809, toLng: 13.0910 },
  { fromDay: 8, from: 'שדה פלרמו', to: 'מרכז פלרמו', duration: '~50-60 דק\' (רכבת/אוטובוס)', toLat: 38.1157, toLng: 13.3615 },
  { fromDay: 10, from: 'פלרמו', to: 'צ\'פאלו', duration: '~40-45 דק\' (רכבת)', toLat: 38.0400, toLng: 14.0231 },
  { fromDay: 10, from: 'צ\'פאלו', to: 'פלרמו', duration: '~40-45 דק\' (רכבת)', toLat: 38.1157, toLng: 13.3615 },
  { fromDay: 10, from: 'פלרמו', to: 'מונריאלה', duration: '~25-30 דק\' (אוטובוס AST)', toLat: 38.0819, toLng: 13.2903 },
  { fromDay: 10, from: 'מונריאלה', to: 'פלרמו', duration: '~25-30 דק\' (אוטובוס)', toLat: 38.1157, toLng: 13.3615 },
  { fromDay: 11, from: 'פלרמו', to: 'קטניה שדה תעופה', duration: '~3 שעות (רכבת ישירה)', toLat: 37.4668, toLng: 15.0664 },
];

function wazeNavUrl(lat, lng) {
  return 'https://waze.com/ul?ll=' + lat + '%2C' + lng + '&navigate=yes';
}
