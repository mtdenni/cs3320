// DEPENDENCIES
var express = require('express');
var router = express.Router();
var connection = require('../config/connection.js');

// ROUTES
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/about', function(req, res) {
  res.render('about');
});

router.get('/account', function(req, res) {
  res.render('account');
});

router.get('/cart', function(req, res) {
  res.render('cart');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/payment', function(req, res) {
  res.render('payment');
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.get('/shipping', function(req, res) {
  res.render('shipping');
});

router.get('/store', function(req, res) {
  res.render('store');
});

router.get('/thankyou', function(req, res) {
  res.render('thankyou');
});

// EXPORTS
module.exports = router;
