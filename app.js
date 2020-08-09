require('dotenv/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

//Import Routes
const getirBiMutlulukRoute = require('./routes/getirbimutluluk');
app.use('/getirbimutluluk', getirBiMutlulukRoute);

// Connect to Database
mongoose.connect(
    process.env.DB_CONNECTION,
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "getir-case-study" 
    },
    () =>console.log('Connected to Mongo DB')
);

// Boot up and listening to the server
app.listen(PORT, () => {
    console.log("App is listening on port ${PORT}");
});