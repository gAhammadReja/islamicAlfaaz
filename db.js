const mongoose = require('mongoose');

// MongoDB connection URL
// const mongoURI = 'mongodb://localhost:27017/itemsDB';
let password = 'bH60W5DWpvraVpnh'
const mongoURI = `mongodb+srv://GolamAhammadReja:${password}@islamicalfaz.h3iiovy.mongodb.net/itemsDB?retryWrites=true&w=majority&appName=islamicAlfaz`;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB successfully!');
});

module.exports = db;
