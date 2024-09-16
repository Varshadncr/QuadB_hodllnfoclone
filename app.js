const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

// Importing routes
const Route = require('./routes/Route');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set('view engine', 'ejs');

// SQLite Database setup
const dbPath = path.resolve(__dirname, 'hodlinfo_crypto_db.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        // Create table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS crypto_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            base_unit TEXT,
            quote_unit TEXT,
            low REAL,
            high REAL,
            last REAL,
            type TEXT,
            open REAL,
            volume REAL,
            sell REAL,
            buy REAL,
            at INTEGER,
            name TEXT
        )`);
        console.log("Connected to SQLite database.");
    }
});

// Middleware to pass database connection to routes
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Define port
const PORT = process.env.PORT || 8888;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Routes
app.use('/', Route);

// 404 Error Handling
app.use((req, res) => {
    res.status(404).send("404 not found");
});
