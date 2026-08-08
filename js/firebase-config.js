// ==== הגדרות Firebase ====
// 1. היכנסו ל-console.firebase.google.com וצרו פרויקט חינמי (Spark plan).
// 2. באפליקציה החדשה (Web app) העתיקו את אובייקט ה-config לכאן.
// 3. הפעילו Firestore Database במצב production, עם חוקי האבטחה המצורפים בהוראות ה-README.
// כל עוד apiKey נשאר ריק, האתר עובד במצב מקומי בלבד (כל checkbox נשמר רק במכשיר הזה,
// ומסונכרן אוטומטית בין טאבים פתוחים באותו דפדפן/מכשיר) - נוח לבדיקה לפני חיבור Firebase.

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDTLvP3ltKMo_xC2YJXILIjG5oJWDvFEgw",
  authDomain: "ohad-sicily-trip.firebaseapp.com",
  projectId: "ohad-sicily-trip",
  storageBucket: "ohad-sicily-trip.firebasestorage.app",
  messagingSenderId: "446138374726",
  appId: "1:446138374726:web:ea9dbd3c3333e813018847",
};

const FIREBASE_ENABLED = !!(FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey);
