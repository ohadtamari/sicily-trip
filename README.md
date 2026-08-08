# טיול בסיציליה - אתר מלווה 🇮🇹

אתר סטטי (HTML/CSS/JS, בלי build tools) לטיול בסיציליה 17-27.9.2026.
מוכן לאחסון חינמי ב-GitHub Pages, עם סנכרון checkboxes בין שני מכשירים דרך Firebase.

## הרצה מקומית לבדיקה

```bash
cd /Users/ohadtamari/Documents/Sicily
python3 -m http.server 8743
```
ואז פותחים בדפדפן: http://localhost:8743

בלי חיבור Firebase (השלב הבא) - כל הסימונים (checkboxes) עדיין נשמרים ועובדים,
רק שהם מסונכרנים בין טאבים/רענונים באותו מכשיר בלבד, לא בין שני הטלפונים.

---

## שלב 1: חיבור Firebase (לסנכרון checkboxes בין שני הטלפונים)

1. גשו ל-https://console.firebase.google.com והתחברו עם חשבון Google.
2. "Add project" → תנו שם (למשל `sicily-trip`) → אפשר לכבות Google Analytics → Create.
3. בתפריט הפרויקט: **Build → Firestore Database → Create database** →
   בחרו **Start in production mode** → בחרו region קרוב (למשל `eur3`) → Enable.
4. בלשונית **Rules** של Firestore, החליפו את התוכן בזה ואז **Publish**:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /trips/sicily2026 {
         allow read, write: if true;
       }
     }
   }
   ```
   (זה פותח קריאה/כתיבה רק למסמך הספציפי של הטיול הזה - לא לכל שאר ה-Firestore.
   מספיק לשימוש אישי של שניכם, אין בו מידע רגיש.)
5. בעמוד הראשי של הפרויקט: לחצו על סמל ה-Web `</>` כדי להוסיף אפליקציית Web.
   תנו שם (למשל `sicily-web`), **לא** צריך Firebase Hosting. לחצו Register.
6. תעתיקו את אובייקט ה-`firebaseConfig` שמופיע (apiKey, authDomain וכו').
7. פתחו את הקובץ [`js/firebase-config.js`](js/firebase-config.js) בפרויקט כאן,
   והדביקו את הערכים בתוך `FIREBASE_CONFIG`. שמרו.
8. רעננו את האתר (מקומי או אחרי העלאה) - הוא יתחבר אוטומטית ל-Firestore.
   אפשר לוודא בלשונית Data ב-Firestore Console שנוצר מסמך `trips/sicily2026`.

---

## שלב 2: העלאה ל-GitHub Pages (חינמי, בלי דומיין בתשלום)

**אופציה א' - דרך האתר (בלי git/טרמינל):**
1. גשו ל-https://github.com → New repository → שם: `sicily-trip` → Public → Create repository.
2. בעמוד הריפו: **Add file → Upload files**, גררו את **כל** התוכן של התיקייה
   (index.html, css/, js/) - שימו לב להעלות את התוכן *של* התיקייה, לא את התיקייה עצמה כתיקייה יחידה.
3. Commit changes.
4. Settings → Pages → תחת "Build and deployment" בחרו Source: **Deploy from a branch**,
   Branch: **main** / **(root)** → Save.
5. אחרי דקה-שתיים האתר יהיה זמין בכתובת שתופיע שם, בפורמט:
   `https://<your-github-username>.github.io/sicily-trip/`
6. שלחו את הקישור לבן/בת הזוג - עובד בכל דפדפן, בלי צורך בחשבון Claude.

**אופציה ב' - עם git (למי שנוח):**
```bash
cd /Users/ohadtamari/Documents/Sicily
git remote add origin https://github.com/<your-username>/sicily-trip.git
git branch -M main
git push -u origin main
```
ואז Settings → Pages כמו בשלב 4-5 למעלה.

---

## עריכת תוכן בהמשך

כל התוכן בקבצי `js/data-*.js`, בעברית/JS פשוט, קל לעריכה:
- **מלונות**: `js/data-map.js` → `HOTELS_PLACEHOLDER` (מסומן "להשלמה" - טרם הוזמנו).
- **מסעדות/שעות פתיחה**: `js/data-food.js` → `FOOD_PLACES` (שעות `closedDays` משוערות - מומלץ לעדכן אחרי בדיקה).
- **מנות**: `js/data-food.js` → `FOOD_DISHES`.
- **ציוד**: `js/data-packing.js`.
- **רכב/דלק/נסיעות**: `js/data-transport.js`.
- **מסלול יומי**: `js/data-trip.js`.

אחרי עריכה - פשוט מעלים שוב את הקובץ המעודכן ל-GitHub (Upload files על אותו נתיב, או `git push`),
והאתר מתעדכן אוטומטית תוך דקה.
