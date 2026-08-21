// סנכרון checkboxes (רשימת ציוד + מנות אוכל) בין שני המכשירים דרך Firebase Firestore.
// אם Firebase לא הוגדר עדיין (ראו firebase-config.js) - נופל אוטומטית למצב מקומי
// (localStorage), שמסונכרן בין טאבים פתוחים באותו דפדפן דרך אירוע 'storage'.

const SYNC_DOC_PATH = { collection: 'trips', doc: 'sicily2026' };
const LOCAL_KEY = 'sicily-trip-sync-data';

const SyncService = {
  state: { packing: {}, foodDishes: {}, placeNotes: {}, checklist: {} },
  _subscribers: [],
  _mode: 'local',
  _firestoreDocRef: null,
  _updateDoc: null,
  _setDoc: null,

  subscribe(cb) {
    this._subscribers.push(cb);
    cb(this.state);
  },

  _emit() {
    this._subscribers.forEach(cb => cb(this.state));
  },

  // ממזג state שנטען (מ-localStorage/Firestore) עם ברירת מחדל, כדי לא לקרוס
  // כשנוסף שדה חדש (כמו placeNotes) אחרי שכבר היה state ישן שמור אצל המשתמש.
  _withDefaults(loaded) {
    return {
      packing: (loaded && loaded.packing) || {},
      foodDishes: (loaded && loaded.foodDishes) || {},
      placeNotes: (loaded && loaded.placeNotes) || {},
      checklist: (loaded && loaded.checklist) || {},
    };
  },

  async setPacking(itemKey, person, value) {
    if (!this.state.packing[itemKey]) this.state.packing[itemKey] = {};
    this.state.packing[itemKey][person] = value;
    await this._persist('packing', this.state.packing);
  },

  async setDish(dishId, value) {
    if (!this.state.foodDishes) this.state.foodDishes = {};
    this.state.foodDishes[dishId] = value;
    await this._persist('foodDishes', this.state.foodDishes);
  },

  async setPlaceNote(placeId, text) {
    if (!this.state.placeNotes) this.state.placeNotes = {};
    this.state.placeNotes[placeId] = text;
    await this._persist('placeNotes', this.state.placeNotes);
  },

  async setChecklistItem(itemId, value) {
    if (!this.state.checklist) this.state.checklist = {};
    this.state.checklist[itemId] = value;
    await this._persist('checklist', this.state.checklist);
  },

  async _persist(field, value) {
    if (this._mode === 'firestore') {
      try {
        await this._updateDoc(this._firestoreDocRef, { [field]: value });
      } catch (e) {
        console.warn('כשל בכתיבה ל-Firestore, שומר מקומית', e);
        this._persistLocal();
      }
    } else {
      this._persistLocal();
    }
  },

  _persistLocal() {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(this.state));
    // מודיע לטאב הנוכחי (אירוע storage לא נורה בטאב שביצע את השינוי)
    this._emit();
  },

  async init() {
    if (FIREBASE_ENABLED) {
      try {
        await this._initFirestore();
        this._mode = 'firestore';
        return;
      } catch (e) {
        console.warn('חיבור ל-Firebase נכשל, עובר למצב מקומי', e);
      }
    }
    this._initLocal();
  },

  _initLocal() {
    this._mode = 'local';
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) {
      try { this.state = this._withDefaults(JSON.parse(raw)); } catch (e) { /* ignore */ }
    }
    window.addEventListener('storage', (e) => {
      if (e.key === LOCAL_KEY && e.newValue) {
        try { this.state = this._withDefaults(JSON.parse(e.newValue)); this._emit(); } catch (err) { /* ignore */ }
      }
    });
    this._emit();
  },

  async _initFirestore() {
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js');
    const { getFirestore, doc, onSnapshot, setDoc, updateDoc } =
      await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js');

    const app = initializeApp(FIREBASE_CONFIG);
    const db = getFirestore(app);
    const ref = doc(db, SYNC_DOC_PATH.collection, SYNC_DOC_PATH.doc);
    this._firestoreDocRef = ref;
    this._updateDoc = updateDoc;
    this._setDoc = setDoc;

    await new Promise((resolve, reject) => {
      let resolved = false;
      onSnapshot(ref, (snap) => {
        this._mode = 'firestore'; // מוגדר כאן (ולא רק אחרי ה-await ב-init) כדי שה-emit הראשון כבר ישקף מצב מדויק
        if (snap.exists()) {
          this.state = this._withDefaults(snap.data());
        } else {
          setDoc(ref, this.state).catch(() => {});
        }
        this._emit();
        if (!resolved) { resolved = true; resolve(); }
      }, (err) => {
        if (!resolved) { resolved = true; reject(err); }
      });
      setTimeout(() => { if (!resolved) { resolved = true; reject(new Error('timeout')); } }, 6000);
    });
  },
};

SyncService.readyPromise = SyncService.init();
