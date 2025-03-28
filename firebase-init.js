import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
import { 
    getDatabase, 
    ref, 
    get, 
    set, 
    push,
    query,
    orderByChild
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD15s-kXdKfR57DazS_Kp7fjVAn_ZpKph0",
  authDomain: "eg-innovations-wack-a-mole.firebaseapp.com",
  databaseURL: "https://eg-innovations-wack-a-mole-default-rtdb.firebaseio.com", // Add this line
  projectId: "eg-innovations-wack-a-mole",
  storageBucket: "eg-innovations-wack-a-mole.firebasestorage.app",
  messagingSenderId: "1027487200717",
  appId: "1:1027487200717:web:aa57b2ab9aa315156a8084",
  measurementId: "G-1ET6DY77DQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Keep the connection test function
const connectDatabase = async () => {
    try {
        console.log("Attempting database connection...");
        const testRef = ref(database, 'connectionTest');
        await set(testRef, {
            timestamp: new Date().toISOString(),
            status: 'connected'
        });
        console.log("✅ Database connection successful");
        return true;
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        return false;
    }
};

// Test connection immediately
connectDatabase().catch(error => {
    console.error("Initial connection test failed:", error);
});

// Export everything needed
export { 
    app, 
    analytics, 
    database, 
    ref, 
    get, 
    set, 
    push, 
    query, 
    orderByChild,
    connectDatabase 
};