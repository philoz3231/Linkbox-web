var express = require('express');
var router = express.Router();

require('./connection')();

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
        res.render('login', { title: 'login'});
       // res.redirect('/');
    }
});

router.post('/', function(req, res){
    //Create cookie
    var login = req.param('id');
    var password = req.param('password');

    //Print cookie
    console.log(login, password);
    console.log(req.body);

    //Retrieve usrID & usrPassword according to id

    connection.query('SELECT * FROM usrList WHERE usrID=?', [login], function(err, data){

        if(data.length != 0){
            console.log(data[0]['usrID']);
            console.log(data[0]['usrPassword']);
            //Check login
            if(password == data[0].usrPassword){
                //login success
                res.cookie('auth', true);
                res.redirect('/mainPage');
            }
            else{
                //password was wrong
                res.redirect('/login');
                //res.send(500, 'showAlert'); /*Ajax필요 클라에서 구현할것*/
                console.log('wrong password');
            }
        }
        else{
            //id was wrong
            res.redirect('/login');
            //res.send(500, 'showAlert'); /*Ajax필요 클라에서 구현할것*/
            console.log('wrong id');
        }

    });
});

module.exports = router;