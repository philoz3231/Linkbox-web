var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function(req, res){
  if(req.cookies.auth){
    res.redirect('/mainPage');
    console.log('check cookie at homeAddress');
  }
  else{
    res.render('index', { title: 'Linkbox' });

    // res.redirect('/');
  }
});

module.exports = router;
