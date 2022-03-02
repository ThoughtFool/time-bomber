
function removePlayerFromRoom(currentRoomName, username) {
    const { activeRoomsObject } = require(".");
    
    const newArray =
        activeRoomsObject[currentRoomName].playerListArray.filter(notUsername);
    activeRoomsObject[currentRoomName].playerListArray = newArray;

    function notUsername(playerName, index) {
        return playerName !== username;
    }
};

module.exports = removePlayerFromRoom;
