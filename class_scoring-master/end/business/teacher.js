const {mysql: {pool}} = require("../util");
const {log} = require("../util");

const user = "`User`";
const tableDeta = "`condition`";

async function login(userName, userPassword) {
    const res = await pool.execute(
        `SELECT id FROM ${user} WHERE wxopenid = ? AND wxunionid = ?;`,
        [userName, userPassword]
    );
    log.debug(`老师${userName}：${userPassword}查询成功`);
    return res[0];
}

async function register(name, userName, userPassword) {
    const res = await pool.execute(
        `INSERT INTO ${user}(name,wxopenid,wxunionid)VALUES(?,?,?)`,
        [name, userName, userPassword]
    );
    log.debug(`老师${userName}：${userPassword}插入成功`);
    let insertId = res[0].insertId;
    return insertId;
}

async function identity(userID) {
    const res = await pool.execute(
        `SELECT wxopenid FROM ${user} WHERE id = ?;`,
        [userID]
    );
    log.debug(`老师${userID}身份查询成功`);
    return  res[0];
}

async function alterTest(title, addScore, id) {
    await pool.execute(
        `UPDATE ${tableDeta} SET title =? , add_score = ? WHERE id = ?;`,
        [title, addScore, id]
    );
    log.debug(`修改成绩成功`);
    return  ;

}
async function deleteTest( id) {
    await pool.execute(
        'CALL `class_scoring`.`delete_test`(?);',
        [id]
    );
    log.debug(`删除成绩${id}成功`);
    return  ;
}
    



module.exports = {
   login,
   register,
   identity,
   alterTest,
   deleteTest

}