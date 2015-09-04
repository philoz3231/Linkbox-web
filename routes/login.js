var Client = require('node-rest-client').Client;
var express = require('express');
var router = express.Router();

require('./connection')();
client = new Client();


/* GET login page.
router.get('/', function(req, res, next) {
    res.render('login', { title: 'login' });
}); */

//Setting router
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
    var login = req.body.id;
    var password = req.body.password;

    //Print cookie
    console.log(login, password);


    var args = {
        data: {usrID: login, usrPassword: password, usrType: 0, pushToken: 'testToken'},
        headers: {"Content-Type": "application/json"}
    };

    //Get IP address  Source: http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
    'use strict';
    var os = require('os');
    var ifaces = os.networkInterfaces();
    var deviceKey ='';

    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                //console.log(ifname + ':' + alias, iface.address);
                alias++;
            } else {
                // this interface has only one ipv4 adress
               // console.log(ifname, iface.address);
            }
            deviceKey = iface.address;
        });
    });

// en0 192.168.1.101
// eth0 10.0.0.101

    console.log('device Key:' + deviceKey);

    client.post("http://54.69.181.225:3000/usrList/Login/" + deviceKey, args, function(data, response){
        console.log(deviceKey);
        var jsonData = JSON.parse(data);
        console.log(jsonData.object);

        if(jsonData.object != null){
            //login success
            console.log('login success');
            var objectData = jsonData.object;
            console.log(objectData.usrKey);

            res.cookie('auth', true);
            res.cookie('userKey', objectData.usrKey);
            res.cookie('devicesKey', deviceKey);

            res.redirect('/mainPage');
        }

        else{
            res.redirect('/login');
        }
    });

});

module.exports = router;