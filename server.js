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



  //create api endpoint to retrieve all candidates from candidates table:
//db object is using query method to run SQL query and execute the callback with ALL rows from candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;

    db.query(sql, (err, rows) => {
        if (err) {
            //if theres an error, respond with a json object
            //500 error = server error
            res.status(500).json({ error:err.message });
            return;
        }
        res.json({
            message: 'success',
            data:rows
        });
    });
});
  

// GET a single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    //Because params can be accepted in the database call as an array, params is assigned as an array with a single element, req.params.id.
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
          //status code 400 to notify client their request wasnt accepted and to try a different request
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });


  // Delete a candidate
  //DELETE statement has a question mark (?) that denotes a placeholder, making this a prepared statement. A prepared statement can execute the same SQL statements repeatedly using different values in place of the placeholder.
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });


// Create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
//               VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });





//Default response for ANY other request (Not Found); must be placed last
app.use((req, res) => {
    res.status(404).end();
});





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });