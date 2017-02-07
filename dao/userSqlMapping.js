var user = {
    insert: 'INSERT INTO users (user_name, user_password) VALUES(?,?)',
    queryUserByName: 'select * from users where user_name= ?',
    queryUser: 'select * from users where user_name= ? and user_password =?',
    // update: 'update user set name=?, age=? where id=?',
    // delete: 'delete from user where id=?',
    // queryAll: 'select * from user'
};

module.exports = user;