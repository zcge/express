var mysql = require("mysql");
var $conf = require('../conf/conf');
var pool = mysql.createPool($conf.mysql);
var query = function(sql, params, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, params, function(err, result) {
                //释放连接  
                conn.release();
                //事件驱动回调  
                callback(err, result);
            });
        }
    });
};


module.exports = query;