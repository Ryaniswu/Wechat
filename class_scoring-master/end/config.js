module.exports = {
    server: {
        port: 3005,
        host: "0.0.0.0",
    },
    mysql: {
        host    : '127.0.0.1',
        port    : 3306,
        user    : 'root',
        password: '123456',
        database: 'class_scoring'
    },
    //session配置
    session: {
        key: 'koa:sess', 
        maxAge: 600000,//10分钟后过期
        autoCommit: true, 
        overwrite: true, 
        httpOnly: true, 
        signed: true, 
        rolling: false, 
        renew: false, 
      }
};