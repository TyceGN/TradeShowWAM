// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
// (Add additional imports if you use other Firebase products, e.g., Firestore)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD15s-kXdKfR57DazS_Kp7fjVAn_ZpKph0",
  authDomain: "eg-innovations-wack-a-mole.firebaseapp.com",
  projectId: "eg-innovations-wack-a-mole",
  storageBucket: "eg-innovations-wack-a-mole.firebasestorage.app",
  messagingSenderId: "1027487200717",
  appId: "1:1027487200717:web:aa57b2ab9aa315156a8084",
  measurementId: "G-1ET6DY77DQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export what you need for later use (for example, the app or analytics, or Firestore instance)
export { app, analytics };
