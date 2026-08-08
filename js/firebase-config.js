// ==== הגדרות Firebase ====
// 1. היכנסו ל-console.firebase.google.com וצרו פרויקט חינמי (Spark plan).
// 2. באפליקציה החדשה (Web app) העתיקו את אובייקט ה-config לכאן.
// 3. הפעילו Firestore Database במצב production, עם חוקי האבטחה המצורפים בהוראות ה-README.
// כל עוד apiKey נשאר ריק, האתר עובד במצב מקומי בלבד (כל checkbox נשמר רק במכשיר הזה,
// ומסונכרן אוטומטית בין טאבים פתוחים באותו דפדפן/מכשיר) - נוח לבדיקה לפני חיבור Firebase.

const FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const FIREBASE_ENABLED = !!(FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey);
