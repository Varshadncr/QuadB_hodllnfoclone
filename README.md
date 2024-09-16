# HODLINFO-QuadBTech
The site is a cryptocurrency trading platform comparison tool that provides key information for different platforms, helping users make informed decisions.

This project is a Node.js application that fetches data from an API, stores it in a database, and displays the processed data in a tabular view. It includes features like data retrieval, database storage, data processing, and frontend rendering using EJS templates.


Project Setup
Create Project Directory: Start by setting up the project folder with a clear structure:
Create the root project folder (hodlinfo_clone).
Inside this folder, create subfolders:
public for storing static files like CSS, JavaScript, and images.
views for storing the HTML files or templates.
routes for Express routes.
Initialize Node.js: In the root of the project, initialize a Node.js project:
Run npm init and follow the instructions to set up your package.json file.
Install necessary packages like:
express for handling routes.
sqlite3 for data storage.
axios to fetch data from the WazirX API.
HTML and CSS Setup
HTML: The webpage should closely resemble the hodlinfo.com design (90% similarity). Create the following elements:
A header with the title and navigation elements.
A section for displaying the best price to trade.
A table or grid to show platform, last traded price, buy/sell price, and other related information.
A footer for additional information or links.
CSS: Style the page to look similar to the provided webpage:
Use a dark theme background.
Include responsive design, ensuring the layout adjusts for different screen sizes.
Use appropriate margins, padding, and font styles.
Ensure the percentage differences are highlighted in red or green, based on positive or negative values.
Set Up SQLite Database
Install SQLite: Install the necessary package using npm install sqlite3.
Create Database and Table:
Set up an SQLite database that stores the following data: name, last, buy, sell, volume, and base_unit.
Design a simple table schema to store the top 10 results fetched from the API.
Fetch Data from WazirX API
API Request: Use the WazirX API (https://api.wazirx.com/api/v2/tickers) to fetch real-time cryptocurrency data.
Use fetch to get the top 10 results.
Extract fields like name, last, buy, sell, volume, and base_unit from the API response.
Store Data in SQLite: Once the data is fetched, store the required fields (name, last, buy, sell, volume, base_unit) for the top 10 entries in your SQLite database.
Backend (Node.js + Express)
Set Up Express Server:
Create a basic Express server that will handle the routes.
Serve the static files (CSS, JavaScript) from the public folder.
Use the GET method to fetch data from the SQLite database and send it to the frontend.
Route for Data:
Create an API route (/api/getTop10) that queries the database and returns the top 10 records to the frontend.
Data Fetching: Use the WazirX API to fetch data every few minutes (using setInterval or a cron job) and update the database to ensure real-time data display.
Frontend (Data Display)
AJAX Call to Fetch Data:
Use JavaScript on the frontend to make an AJAX call to the /api/getTop10 route.
Once the data is fetched, dynamically display it in the table or grid layout on the webpage.
Dynamic Rendering: Ensure that the page updates dynamically without requiring a refresh, reflecting the most recent data from the API.
