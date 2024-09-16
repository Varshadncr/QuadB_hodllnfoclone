const axios = require("axios");
const moment = require('moment');
require('moment-timezone');

const home_page = async (req, res) => {
    try {
        // Fetch data from the WazirX API
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const res_data = response.data;

        // Slice the top 10 results from the response data
        const result = Object.values(res_data).slice(0, 10);

        // Insert new data into SQLite
        const db = req.db;
        const insertQuery = `INSERT INTO crypto_data (base_unit, quote_unit, low, high, last, type, open, volume, sell, buy, at, name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        // Insert each crypto record into the database
        for (const data of result) {
            db.run(insertQuery, [
                data.base_unit,
                data.quote_unit,
                data.low,
                data.high,
                data.last,
                data.type,
                data.open,
                data.volume,
                data.sell,
                data.buy,
                data.at,
                data.name
            ], (err) => {
                if (err) {
                    console.error("Error inserting data:", err.message);
                }
            });
        }

        // Retrieve the last 10 records from the database
        db.all('SELECT * FROM crypto_data ORDER BY id DESC LIMIT 10', (err, rows) => {
            if (err) {
                console.error("Error fetching data:", err.message);
                return res.status(500).send("Error fetching data");
            }

            // Reverse the data order to get the most recent entries first
            rows.reverse();

            // Format the data for rendering
            const processedData = rows.map((data) => {
                const tradeTime = moment.utc(data.at * 1000).tz('Asia/Kolkata').format('DD/MM/YYYY [at] h:mm A');
                return {
                    baseUnit: data.base_unit.toUpperCase(),
                    name: data.name,
                    buy: data.buy,
                    sell: data.sell,
                    volume: data.volume,
                    open: data.open,
                    low: data.low,
                    high: data.high,
                    last: data.last,
                    tradeTime: tradeTime
                };
            });

            // Render the view with the processed data
            res.render('index', { data: processedData });
        });

        // Clean up older data (optional but recommended for performance)
        db.run('DELETE FROM crypto_data WHERE id NOT IN (SELECT id FROM crypto_data ORDER BY id DESC LIMIT 1000)', (err) => {
            if (err) {
                console.error("Error cleaning up old data:", err.message);
            }
        });

    } catch (err) {
        console.error("Internal error:", err.message);
        res.status(500).send('Internal error fetching and storing data');
    }
};

module.exports = { home_page };
