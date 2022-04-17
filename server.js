const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Findn3m01!',
      database: 'election'
    },
    console.log('Connected to the election database.')
  );



//db object is using query method to run SQL query and execute the callback with all the resulting rows from candidates table
db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
  });
  



//Default response for ANY other request (Not Found); must be placed last
app.use((req, res) => {
    res.status(404).end();
});





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });