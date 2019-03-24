const {mysql: {pool}} = require("../util");
const {log} = require("../util");

const tableStud = "`student`";
const tableDeta = "`condition`";

/**
 * 
 * @param {string} name 
 * @param {number} studentID 
 * @returns {Promise<number>} 插入的数据ID
 */
async function insert(name, studentID) {
    const data = await pool.execute(
        `SELECT id  FROM ${tableStud } WHERE student_id = ?;`,
        [studentID]
    );
    //console.log(data[0][0]);
    if(data[0][0]==null){
    const res = await pool.execute(
        `insert into ${tableStud} (student_name,student_id) values (?,?)`,
        [name, studentID]
    );
    log.debug(`插入数据${studentID}：${name}成功`);
    let insertId = res[0].insertId;
    return insertId;
    }else{
        log.debug(`${studentID}已存在`);
        return 0;
    }
}

async function deleteStu(name, studentID) {
    await pool.execute(
        `DELETE  FROM ${tableStud} WHERE student_name=? AND student_id=?`,
        [name, studentID]
    );
    log.debug(`删除${studentID}：${name}成功`);
    return ;
}

async function output() {
    const res = await pool.execute(
        `SELECT * FROM ${tableStud}`
    );
    let data = res[0];
    log.debug(`查询${tableStud}成功`);
    return data;
}

async function alterStu(name, studentID, id) {
    await pool.execute(
        `UPDATE ${tableStud } SET student_name = ? , student_id = ? WHERE id = ?;`,
        [name, studentID, id]
    );
    log.debug(`修改${studentID}：${name}成功`);
    return ;
}

async function insertData(className, title, studentId, addScore,userID) {

    await pool.execute(
        'CALL `class_scoring`.`insert_data`(?, ?, ?, ?,?);',
        [className, title, studentId,addScore,userID]
    );
    
    log.debug(`插入数据${studentId}：${title}成功`);
}

async function inquire(className, studentID , date, userID) {
    let res = await pool.execute(
        'CALL `class_scoring`.`inquire_test`(?,?,?,?);',
        [className, date, userID, studentID]
    );
    log.debug(`查询成绩${studentID}：${date}成功`);
    return res[0];
}
    



module.exports = {
    insert,
    insertData,
    inquire,
    output,
    deleteStu,
    alterStu

}