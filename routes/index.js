var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let email =req.session.email
  res.render('home', { email: email});
});
router.get('/movie/create', function(req, res, next) {
  let email = req.session.email
  res.render('taophimmoi', { email: email});
});
router.get('/signin', function(req, res, next) { //url trên trình duyệt
  let email = req.session.email
  res.render('signin', { email: email});  //vị trí file trong thư mục mặc định chỉ thay đổi đường link trên http
});
router.get('/signup', function(req, res, next) {
  let email = req.session.email
  res.render('signup', { email: email});
});
router.get('/movie/:id', function(req, res, next) {
  let email = req.session.email
  res.render('moviedetail', { id: req.params.id, email: email});
});

module.exports = router;
