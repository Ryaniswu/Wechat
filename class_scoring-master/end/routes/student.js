const router = require("koa-router")({
    prefix: "/student"
});
const studentCtl = require("../controller/student");
//插入学生
router.post('/insert', studentCtl.insert);
//删除学生
router.post('/deleteStu', studentCtl.deleteStu);
//输出全部学生
router.post('/output', studentCtl.output);
//根据id修改学生
router.post('/alterStu', studentCtl.alterStu);
//插入数据:今天某科,某项标题,学生id,加减分
router.post("/insertData", studentCtl.insertData);
//查询单个学生某天情况
router.post("/inquire", studentCtl.inquire);
module.exports = router.routes();