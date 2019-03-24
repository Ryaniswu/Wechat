/**
 * 
 * @param {number} code 
 * @param {string} message 
 */
function mk(code, message) {
    return { code, message };
}

/**
 * 
 * @param {number} code 
 * @param {string} message 
 */
function mkp(code, message) {
    return function (detail) {
        return { ...mk(code, message), detail };
    }
}

let messageBean = {
    SUCCESS: mk(0, "SUCCESS"),
    SYSTEM_ERROR:mk(1,"System Error"),
    INVALID_PARAM: mkp(11, "Invalid Parameter"),
    NOT_LOGIN:mk(401,"not login"),
}

module.exports = messageBean;