var Client = require('node-rest-client').Client;
var express = require('express');
var router = express.Router();

require('./connection')();
client = new Client();

/* GET home page. */
router.get('/', function(req, res, next) {

    /*
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
    */

    var userKey = req.cookies.userKey;
    var devicesKey = req.cookies.devicesKey;
    var args = {
        data: {usrKey: userKey},
        headers:{"Content-Type": "application/json"}
    };

    var boxListData = [];

    client.get("http://54.68.42.138:9000/boxList/List/" + userKey, args, function(data, response){
        var jsonData = JSON.parse(data);

        if(jsonData.object != null){
            //box exist
            //console.log(jsonData.object);
            boxListData = jsonData.object;
        }

        var urlListData = [];
        client.get('http://54.68.42.138:9000/urlList/AllList/'+ userKey + '/0/5', args, function(data2, resonse2){
            var jsonData = JSON.parse(data2);

            if(jsonData.object != null){
                //urlList exist
                //console.log(jsonData.object);
                urlListData = jsonData.object;
            }
            res.render('mainPage', { title: 'mainPage' , urlListData: urlListData, boxListData: boxListData, userKey:userKey});
        });
    });

    /*
    if(boxListData.length == 0){
        console.log('No data in boxListData')
    }else{
        console.log('data exist but cannot print out');
    };*/

});

module.exports = router;
