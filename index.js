// app.js
const express = require('express');
const cors = require('cors')

const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db'); // Import MongoDB connection
const Item = require('./itemModel'); // Import item schema


const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Serve static files (admin login page and admin dashboard)
app.use(express.static(path.join(__dirname, '/')));

// GET route to serve admin login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/adminLogin.html'));
});

// POST route to handle admin login
app.post('/admin', (req, res) => {
    const user = req.body;

    if (user.username === 'ahammadreja' && user.password === '7501728816$') {
        res.sendFile(path.join(__dirname, '/admin.html'));
    } else {
        res.send('invalid');
    }
});

// GET route to fetch all items
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items.reverse());
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST route to add a new item
app.post('/items', async (req, res) => {
    try {
        const { itemName, itemDescription, itemLink } = req.body;
        const newItem = new Item({ itemName, itemDescription, itemLink });
        await newItem.save();
        res.sendStatus(200); 
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).send('Internal Server Error');
    }
});


// DELETE route to delete an item by ID
app.delete('/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        res.json(deletedItem);
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
