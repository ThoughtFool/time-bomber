
function addPlayerToRoom(nextroomName, username) {
    const { activeRoomsObject } = require(".");
    
    activeRoomsObject[nextroomName].playerListArray.push(username);
};

module.exports = addPlayerToRoom;
