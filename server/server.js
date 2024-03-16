const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

const port = process.env.PORT || 3000

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});




app.use(cors())
app.use(express.json())
app.use('/problems',require('./routes/problemRoutes'))


mongoose
  .connect('mongodb://127.0.0.1/test')
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  })
  .catch((err) => console.log(err));