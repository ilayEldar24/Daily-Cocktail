
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import ejs from "ejs";
import path from "path";

// Create an instance of Express
const app = express();
const port = 3000;

// Define the API URL
const API_URL = 'http://www.thecocktaildb.com/api/json/v1/1';

// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Define the route for the homepage
app.get("/", async (req, res) => {
    try {
        // Make a GET request to the API
        const result = await axios.get(`${API_URL}/random.php`);
        const drinkData = result.data.drinks[0];
        
        // Render the index.ejs template with the drink data
        res.render('index.ejs', { drink: drinkData });
    } catch (error) {
        console.error('There was an error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});