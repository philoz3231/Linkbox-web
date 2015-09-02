var express = require('express');
var router = express.Router();

require('./connection')();

/* GET home page. */
router.get('/', function(req, res, next) {
    // check auth
    // res.send(req.cookies);
    res.render('mainPage', { title: 'mainPage' });
});

module.exports = router;
