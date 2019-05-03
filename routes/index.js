var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let email =req.session.email
  res.render('home', { email: email});
});
router.get('/taophimmoi', function(req, res, next) {
  let email = req.session.email
  res.render('taophimmoi', { email: email});
});
router.get('/signin', function(req, res, next) {
  let email = req.session.email
  res.render('signin', { email: email});
});
router.get('/signup', function(req, res, next) {
  let email = req.session.email
  res.render('signup', { email: email});
});
module.exports = router;
