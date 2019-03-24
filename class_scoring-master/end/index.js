const Koa = require('koa');
let config = require("./config");
const session = require('koa-session');
const app = new Koa();
const {log} = require("./util");
const middleware = require("./middleware");

app.keys = ['this is a code'];
app.use(session(config.session, app));

for (let m of middleware) {
    app.use(m);
}


app.listen(config.server, () => {
    log.info(`app started at ${config.server.host}:${config.server.port}`)
});