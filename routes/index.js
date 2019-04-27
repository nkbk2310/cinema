var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});
router.get('/taophimmoi', function(req, res, next) {
  res.render('taophimmoi');
});
module.exports = router;
