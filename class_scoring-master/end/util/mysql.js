const { mysql: config } = require("../config");
const mysql = require('mysql2/promise');
//连接池手动关闭吗?
let pool = mysql.createPool({
    ...config, 
    waitForConnections: true,
    connectionLimit   : 10,
    queueLimit        : 0
});

module.exports = {
    pool,

};