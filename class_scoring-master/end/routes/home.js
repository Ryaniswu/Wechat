const router = require("koa-router")({});

router.all("/home", async (ctx, next) => {
    ctx.body = "学生加分统计系统";
});

module.exports = router.routes();