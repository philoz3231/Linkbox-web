var Client = require('node-rest-client').Client;
var express = require('express');
var router = express.Router();

require('./connection')();
client = new Client();

/* GET home page. */
router.get('/', function(req, res, next) {

    // Parse cookie
    var cookie = req.headers.cookie;
    cookie = cookie.split(';').map(function(element){
        var element = element.split('=');
        return{
            key: element[0],
            value: element[1]
        };
    });
    console.log('userKey:' + cookie[1].value);
    console.log('devicesKey:' + cookie[2].value);

    var userKey = cookie[1].value;
    var devicesKey = cookie[2].value;
    var args = {
        data: {usrKey: userKey},
        headers:{"Content-Type": "application/json"}
    };
    client.get("http://54.69.181.225:3000/boxList/List/" + userKey, args, function(data, response){
        var jsonData = JSON.parse(data);
        console.log(jsonData);


    })

    res.render('mainPage', { title: 'mainPage' });
});

module.exports = router;
