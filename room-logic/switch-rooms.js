function switchRooms(currentRoomName, nextRoomName, username) {
    
    const { removePlayerFromRoom, addPlayerToRoom } = require(".");

    removePlayerFromRoom(currentRoomName, username);
    addPlayerToRoom(nextRoomName, username);
    return {msg: "success"};
}

module.exports = switchRooms;
