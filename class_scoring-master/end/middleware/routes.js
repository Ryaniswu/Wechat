const router = require('koa-router')();
const routes = require("../routes");

for (let route of routes) {
    router.use(route);
}

module.exports = router.routes();