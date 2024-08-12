const express = require('express');
// const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Sarthak@786',
    database: 'world',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});


db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
});

app.get('/api/banner', (req, res) => {
    const query = 'SELECT * FROM banner WHERE id = 1';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

app.post('/api/banner', (req, res) => {
    const { description, isVisible, timer, link } = req.body;
    const query = 'UPDATE banner SET description = ?, isVisible = ?, timer = ?, link = ? WHERE id = 1';
    db.query(query, [description, isVisible, timer, link], (err, result) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
