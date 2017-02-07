var express = require('express');
var router = express.Router();
var userService = require("../dao/userDao.js");
/* 首页 */
router.get('/', function(req, res, next) {
    res.render('index', { title: '主页' });
});

//login用户登录
router.get("/login", function(req, res) {
    if (req.session.userName) {
        res.send({ code: "200", msg: "登录成功" });
        return;
    } else {

        res.render('login', { title: '登录' });
    }
});
router.post("/login", function(req, res) {
    userService.login(req, res)
});

//登出
router.get("/logout", function(req, res) {});

//reg 用户注册
router.get("/reg", function(req, res) {
    res.render('reg', {
        title: '註冊',
        success: req.flash("success").toString(),
        error: req.flash("error").toString()
    });
});
router.post("/reg", function(req, res) {
    userService.add(req, res);
});

//404
router.get("*", function(req, res) {
    res.send("404页面");
});

module.exports = router;