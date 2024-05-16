const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware - บอกวิธีการที่ client ส่งข้อมูลผ่าน middleware
app.use(bodyParser.urlencoded({extended:false})) // ส่งผ่าน Form
app.use(bodyParser.json()) // ส่งด้วย Data JSON

app.use(express.static(path.join(__dirname, 'public')));

const dbConn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'student_database',
    port: 3306
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'student.html'));
});

app.post('/students', (req, res) => {
    const { name, age, phone, email } = req.body;
    dbConn.query('INSERT INTO students (name, age, phone, email) VALUES (?, ?, ?, ?)', [name, age, phone, email], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, name, age, phone, email });
    });
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
