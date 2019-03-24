let log4js = require('log4js');
let logger = log4js.getLogger();

let level = "debug";
logger.level = level;
logger.debug(`Log 启动成功，启动层级：${level}`);

module.exports = logger;