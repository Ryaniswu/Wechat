const router = require("koa-router")({
  prefix: "/teacher"
});
const teacher = require("../controller/teacher");
//注册
router.post("/register", teacher.register);

//登录
router.post("/login", teacher.login);

//返回会话身份
router.post("/identity", teacher.identity);

//修改成绩
router.post("/alterTest", teacher.alterTest);

  //删除成绩
router.post("/deleteTest", teacher.deleteTest);
  
module.exports = router.routes();
