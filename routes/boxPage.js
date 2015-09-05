var Client = require('node-rest-client').Client;
var express = require('express');
var router = express.Router();

require('./connection')();
client = new Client();

/* GET home page. */
router.get('/:boxKey', function(req, res, next) {
    var boxKey = req.param('boxKey');
    console.log(boxKey);

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

    var boxListData = [];

    client.get("http://54.69.181.225:3000/boxList/List/" + userKey, args, function(data, response){
        /*
        박스리스트 다시 안읽어와도 되게 모듈화
        * */
        var jsonData = JSON.parse(data);

        if(jsonData.object != null){
            //box exist
            //console.log(jsonData.object);
            boxListData = jsonData.object;
        }


        var urlBoxListURLData =[];
        client.get('http://54.69.181.225:3000/urlList/BoxList/'+ userKey + '/' + boxKey + '/0/5', args, function(data2, resonse2){
               var jsonData = JSON.parse(data2);

            if(jsonData.object != null){
                //console.log(jsonData.object);
                urlBoxListURLData = jsonData.object;
            }
            res.render('boxPage', { title: 'boxPage' , boxListData: boxListData, urlBoxListURLData:urlBoxListURLData, userKey:userKey});
        })
    });


    /*
     if(boxListData.length == 0){
     console.log('No data in boxListData')
     }else{
     console.log('data exist but cannot print out');
     };*/

});

module.exports = router;
