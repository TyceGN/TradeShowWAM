import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import {
    getDatabase,
    ref,
    get,
    set,
    push,
    query,
    orderByChild
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

//Game version
const GAME_VERSION = '1.2.3'; // Update this version number as needed
const GAME_CONFERENCE = "EU_Dutch-Native-CloudDay"; // Set this to the conference name if needed

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHpMGVWOtxtG67de5C6Ne3QVjmsCNifWg",
  authDomain: "whack-a-mole-eu.firebaseapp.com",
  databaseURL: "https://whack-a-mole-eu-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "whack-a-mole-eu",
  storageBucket: "whack-a-mole-eu.firebasestorage.app",
  messagingSenderId: "1002166766859",
  appId: "1:1002166766859:web:132ecc6369b9bf06caa60e",
  measurementId: "G-SJMXTDV6GK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);

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

const saveGameAnalytics = async (gameData) => {
    try {
        // Use existing gameId if provided, otherwise generate one
        const gameId = gameData.gameId || push(ref(database, 'temp')).key;

        const gameStats = {
            gameId: gameId,
            timestamp: gameData.timestamp,
            gameDuration: gameData.gameDuration,
            score: gameData.score,
            name: gameData.name,
            company: gameData.company,
            isManualEntry: gameData.isManualEntry,
            gameVersion: GAME_VERSION,
            conference: GAME_CONFERENCE,
            deviceType: /iPad|iPhone|iPod/.test(navigator.userAgent) ? 'iOS' : 'Other'
        };

        if (!gameData.isManualEntry && gameData.moleStats) {
            gameStats.moleStats = gameData.moleStats;
        }

        // Only save to gameAnalytics, not to scores again
        await push(ref(database, 'gameAnalytics'), gameStats);

        console.log("✅ Game analytics saved successfully with ID:", gameId);
        return gameId;
    } catch (error) {
        console.error("❌ Failed to save game analytics:", error);
        return false;
    }
};

// Export everything needed
export {
    app,
    analytics,
    database,
    auth,
    ref,
    get,
    set,
    push,
    query,
    orderByChild,
    connectDatabase,
    saveGameAnalytics,
    GAME_CONFERENCE
};