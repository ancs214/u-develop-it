
const express = require('express');
//require connection.js page for mysql2 setup
const db = require('./db/connection');
//require index.js file in apiRoutes--node automatically finds index.js
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();



// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//TO USE API ROUTES - we are defining the prefix "/api" here so that in our apiRoutes files, we dont have to include it in the URLs 
app.use('/api', apiRoutes);



//Default response for ANY other request (Not Found); must be placed last
app.use((req, res) => {
    res.status(404).end();
});




// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
  