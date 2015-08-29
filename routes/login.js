var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET login page.
router.get('/', function(req, res, next) {
    res.render('login', { title: 'login' });
}); */

//Setting router Get 설정 시 '/가 로그인 눌렀을 때임'
router.get('/', function(req, res){
    if(req.cookies.auth){
        res.redirect('/mainPage');
        console.log('check cookie at loginAddress');
    }
    else{
        res.render('login', { title: 'login' });
       // res.redirect('/');
    }
});

/*
router.get('/login', function(req, res){
    fs.readFileSync('login.html', function(error, data){
        res.send(data.toString());
        console.log('move to filehome');
    })
}); */

router.post('/', function(req, res){
    //Create cookie
    var login = req.param('id');
    var password = req.param('password');

    //Print cookie
    console.log(login, password);
    console.log(req.body);

    //Check login
    if(login == 'admin' && password == 'admin'){
        //login success
        res.cookie('auth', true);
        res.redirect('/mainPage');
    }
    else{
        //login fail
        res.redirect('/login');
    }

});

module.exports = router;