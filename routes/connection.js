/**
 * Created by Junho on 2015-11-09.
 */
module.exports = function() {
    this.connection = require('mysql').createConnection({
        'host' : 'linkdatabase.cmjtlirznb66.us-west-2.rds.amazonaws.com',
        'user' : 'Junho',
        'password' : 'newlink123',
        'database' : 'linkdatabase'
    });
};