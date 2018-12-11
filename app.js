const express = require('express'); // require in express
const bodyParser = require('body-parser'); // middleware
const cookieParser = require('cookie-parser'); // middleware

const app = express(); // returns and express application
app.use(bodyParser.urlencoded({ extend: false })); // needed for post request to be read properly
app.use(cookieParser()); // need to read cookies being sent back to client
app.used(express.static('public')); // serve static files

const mainRoutes = require('./routes'); // will automatically look for index.js file
const cardRoutes = require('./routes/cards');

app.use(mainRoutes); // middleware
app.use('/cards', cardRoutes);

app.set('view engine', 'pug'); // using template engine pug

// Creates the error object and handing to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found!');
  err.status = 404;
  next(err);
})


// Error handler
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
})

// set up development server
app.listen(3000, () => {
  console.log('The application is running on port 3000')
}); 
