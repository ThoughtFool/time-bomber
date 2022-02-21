const moment = require("moment");

function formatMsg(username, text) {
    return {
        username: username,
        text: text,
        time: moment().format("h:mm a"),
    };
}

module.exports = formatMsg;
