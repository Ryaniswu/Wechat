const {mysql: {pool}} = require("../util");
const {log}     = require("../util");
const tableDeta = "`condition`";
const tableCla = "`class`";

async function inquireCou () {
    let res = await pool.execute(
        `SELECT * FROM ${tableCla};`
    );
    log.debug(`查询课程列表成功`);
    return res[0];
}

async function inquireRel (className, date) {
    let res = await pool.execute(
        "CALL `class_scoring`.`inquire_datcla`(?, ?);",
        [className, date]
    );
    log.debug(`查询数据${className}: ${date}成功`);
    return res[0][0];
}

async function inquireTab (className, date) {
    let res = await pool.execute(
        "CALL `class_scoring`.`collect_data`(?, ?);",
        [className, date]
    );
    log.debug(`查询数据${className}: ${date}成功`);
    return res[0][0];
}

module.exports = {
    inquireRel,
    inquireTab,
    inquireCou
}