const sqlite3 = require('sqlite3').verbose();

// Initialize the SQLite database
const db = new sqlite3.Database('./hodlinfo_crypto_db.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Create table function (optional if already created)
const createCryptoDataTable = () => {
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
    )`, (err) => {
        if (err) {
            console.error("Error creating table:", err.message);
        } else {
            console.log("crypto_data table created or already exists.");
        }
    });
};

// Run the function to create the table if necessary
createCryptoDataTable();

// Example function to insert data (Modify as needed)
const insertCryptoData = (data) => {
    db.run(`INSERT INTO crypto_data (base_unit, quote_unit, low, high, last, type, open, volume, sell, buy, at, name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [data.base_unit, data.quote_unit, data.low, data.high, data.last, data.type, data.open, data.volume, data.sell, data.buy, data.at, data.name],
        function (err) {
            if (err) {
                console.error("Error inserting data:", err.message);
            }
            console.log(`Data inserted with ID ${this.lastID}`);
        }
    );
};

// Example usage (Replace with actual data fetching and insertion logic)
const sampleData = {
    base_unit: 'BTC',
    quote_unit: 'INR',
    low: 3000000,
    high: 3500000,
    last: 3200000,
    type: 'market',
    open: 3100000,
    volume: 100,
    sell: 3250000,
    buy: 3150000,
    at: Date.now(),
    name: 'Bitcoin'
};

// Insert sample data (for testing)
insertCryptoData(sampleData);

// Close the database connection when done (optional, depending on application lifecycle)
// db.close((err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Closed the database connection.');
// });

module.exports = db;
