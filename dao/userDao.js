// dao/userDao.js
// 实现与MySQL交互
// var mysql = require('mysql');
// var $conf = require('../conf/conf');
var $sql = require('./userSqlMapping');
var sqlQuery = require("../util/mysql");
var crypto = require("crypto");
// 向前台返回JSON方法的简单封装
var jsonWrite = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
userService = {
    add: function(req, res, next) {
        var param = req.body;
        if (!param || !req.body.name || !req.body.password || !req.body['password-repeat']) {
            req.flash("error", "参数不完整");
            return res.redirect("/reg");
        }
        var password = req.body.password;
        var password2 = req.body['password-repeat'];
        if (password !== password2) {
            req.flash("error", "2次密码不一致");
            return res.redirect("/reg");
        }
        var password = crypto.createHash("md5").update(param.password).digest("hex");
        sqlQuery($sql.queryUserByName, [param.name], function(err, result) {
            if (result && result.length != 0) {
                req.flash("error", "已经被注册了");
                return res.redirect("/reg");
            } else {
                sqlQuery($sql.insert, [param.name, password], function(err, result) {
                    if (result) {
                        req.flash("success", "注册成功");
                        return res.redirect("/");
                    } else {
                        req.flash("error", "注册失败");
                        return res.redirect("/reg");
                    }

                });
            }



        })

    },
    login: function(req, res) {
        var param = req.body;
        sqlQuery($sql.queryUser, [param.name, param.password], function(err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '登錄成功'
                };
                req.session.userName = param.name;
                req.session.passWord = param.password;
            }
            jsonWrite(res, result);
        });
    }
};

module.exports = userService;