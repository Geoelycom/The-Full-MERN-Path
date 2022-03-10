require('dotenv').config();
const express = require('express');
const { connectToDb } = require('./db');
const { installHandler } = require('./api_handler');


const app = express();

installHandler(app);

app.use(express.static('public'));

const port = process.env.API_PORT;
// Using an IIFE  to connect to the database would throw an error  so i had to wrap
// the async function inside the (app.listen) as a callback hence running our synchronous activities
app.listen(port, async () => {
  try {
    await connectToDb();
    console.log(`API started on port ${port}`);
  } catch (err) {
    console.log('Error:', err);
  }
});
