const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const contacstRoutes = require('./routes/contacts');
const app = express();

mongoose.connect('mongodb://localhost/contacts')
.then(() => {
  console.log('connected to database');
})
.catch(() =>{
  console.log('connection failed');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.use((req, res, next) =>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers',
  'Origin,X-Requested-With,Content-Type,Accept,Authorization');

  if(req.method ==='OPTIONS'){
    res.header('Access-Control-Allow-Methods','GET,PUT,PATCH,DELETE,UPDATE,POST');
    return res.status(200).json({});
  }
  next();
});

app.use('/api/contacts', contacstRoutes);

module.exports = app;
