/**
 * User: gamaroff
 * Date: 2012/07/16
 * Time: 11:26 AM
 */
module.exports = {
    Postgres     : {
        dbName   : 'scouter',
        host     : '127.0.0.1',
        port     : '5432',
        username : 'postgres',
        password : 'postgres'
    },
    RedisWeb     : {
        host : '127.0.0.1',
        port : '6379'
    },
    App          : {
        Name : 'Scouter'
    },
    Email        : {
        service  : 'Gmail',
        user     : 'info@invirohub.com',
        password : 'Invirohub101'
    }
};