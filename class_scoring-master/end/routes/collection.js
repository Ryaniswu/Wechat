const router = require("koa-router")({
    prefix: "/collection"
});
const collect = require("../controller/collection");

//查询科目列表
router.post('/inquireCou', collect.inquireCou);

//汇总数据根据某个日期和科目
router.post('/release', collect.inquireRel);

//汇总数据根据 学号/发布日/合计值
router.post('/table', collect.inquireTab);

module.exports = router.routes();