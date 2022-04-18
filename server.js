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



//db object is using query method to run SQL query and execute the callback with all the resulting rows from candidates
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log('row');
//   });
  
// GET a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log('row');
//   });

  // Delete a candidate
  //DELETE statement has a question mark (?) that denotes a placeholder, making this a prepared statement. A prepared statement can execute the same SQL statements repeatedly using different values in place of the placeholder.
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });


// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
              VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});





//Default response for ANY other request (Not Found); must be placed last
app.use((req, res) => {
    res.status(404).end();
});





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });