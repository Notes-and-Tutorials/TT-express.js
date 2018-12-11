const express = require('express');
const router = express.Router(); // router instance

// Middleware
// router.use((req, res, next) => {
//   console.log('hello');
//   const err = new Error('error!!!'); // custom error object
//   err.status = 500;
//   next(err);
// })

// // Middleware
// router.use((req, res, next) => {
//   console.log('world');
//   next();
// })

// Welcome Page
router.get('/', (req, res) => {
  const name = req.cookies.username;

  // When go to root router and there is no username cookie, 
  // then redirect to hello route.
  if (name) {
    res.render('index', { name }); // same as { name: name } - ES6
  } else {
    res.redirect('/hello')
  }
});

// Username form page
router.get('/hello', (req, res) => {
  const name = req.cookies.username;

  // Redirect to index page if cookies username value is set,
  // otherwise render hello form.
  if (name) {
    res.redirect('/')
  } else {
    res.render('hello');
  }
});

// post input to server
router.post('/hello', (req, res) => {
  res.cookie('username', req.body.username); // sends a cookie the to the browser after we submit the form
  res.redirect('/'); // after submit username, redirect
})

// Log out button on index page
router.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
})



module.exports = router;
