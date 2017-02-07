module.exports = {
    mysql: {
        host: 'hankewei.xyz',
        user: 'root',
        password: 'mysql123456',
        database: 'hkw', // 前面建的user表位于这个数据库中
        port: 3306
    },
    session: {
        secret: '12345',
        name: 'testapp', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
        cookie: { maxAge: 80000 }, //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
        resave: false,
        saveUninitialized: true,
    }
};