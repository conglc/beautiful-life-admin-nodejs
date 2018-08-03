const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb://admin:admin123@ds127928.mlab.com:27928/beautiful-life");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

const authRoutes = require('./api/routes/auth.route');
const userRoutes = require('./api/routes/user.route');
const categoryRoutes = require('./api/routes/category.route');
const articleRoutes = require('./api/routes/article.route');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/articles', articleRoutes);

app.use((req, res, next) => {
  console.log('Not found');
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  console.log('Not found error');
  res.status(error.status || 500);
  res.json({
      error: {
          message: error.message
      }
  });
});


module.exports = app;