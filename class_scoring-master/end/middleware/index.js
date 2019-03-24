const route = require("./routes");
const bodyparser = require("./bodyparser");

module.exports = [
    bodyparser,

    //放在最后
    route,
];