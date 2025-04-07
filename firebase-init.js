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
const GAME_VERSION = '1.2.1';
const GAME_CONFERENCE = 'NerdioCon';

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
        // Generate a unique game ID
        const gameId = push(ref(database, 'temp')).key;

        const gameStats = {
            gameId: gameId,
            timestamp: gameData.timestamp,
            gameDuration: gameData.gameDuration,
            finalScore: gameData.score,
            player: gameData.name,
            company: gameData.company,
            isManualEntry: gameData.isManualEntry,
            gameVersion: GAME_VERSION,
            conference: GAME_CONFERENCE,
            deviceType: /iPad|iPhone|iPod/.test(navigator.userAgent) ? 'iOS' : 'Other'
        };

        if (!gameData.isManualEntry && gameData.moleStats) {
            gameStats.moleStats = gameData.moleStats;
        }

        await Promise.all([
            // Save analytics
            push(ref(database, 'gameAnalytics'), gameStats),
            // Save to scores with additional fields
            push(ref(database, 'scores'), {
                gameId: gameId,
                score: gameData.score,
                name: gameData.name,
                company: gameData.company,
                timestamp: gameData.timestamp,
                isManualEntry: gameData.isManualEntry,
                gameDuration: gameData.gameDuration,
                gameVersion: GAME_VERSION,    // Add this
                conference: GAME_CONFERENCE,   // Add this
                moleStats: gameData.moleStats // Add this
            })
        ]);

        console.log("✅ Game data saved successfully with ID:", gameId);
        return true;
    } catch (error) {
        console.error("❌ Failed to save game data:", error);
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