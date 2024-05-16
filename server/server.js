const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const Problem = require('./models/problemModel')
const path  = require('path')

const app = express()




app.use((req, res, next) => {
  next();
});



app.use(cors())
app.use(express.json())
app.use('/problems',require('./routes/problemRoutes'))
app.use('/submissions',require('./routes/submissionRoutes'))
app.use("/like", require('./routes/likeRoutes'));


mongoose
  .connect('mongodb://127.0.0.1/test')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname,'client','build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'client','build','index.html'));
  });

}

  const port = process.env.PORT || 4000;

  app.listen(port, () => {
      console.log('Server is listening on port 4000');
  });
  