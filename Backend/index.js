const express = require('express');
const db = require('./db.js');
const routes = require('./routes.js');

const app = express();
const PORT = 3000;


app.use(express.json());


db.authenticate()
  .then(() => {
    console.log('Database connection successful');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);

  });

  app.set("view engine", "ejs")
// Use routes
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
