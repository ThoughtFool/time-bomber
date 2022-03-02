function waitListJoinsRoom() {
    const { activeRoomsObject } = require(".");
    const { createRoomName, switchRooms } = require(".");

    // console.log(activeRoomsObject);

    let nextRoomName = createRoomName().toString();
    // let newArray = [];

    // activeRoomsObject.push({ nextRoomName: { playerListArray: newArray } });

    activeRoomsObject[nextRoomName] = { playerListArray: [] };

    // TODO: add getter for currentRoom in roomsObj per username:
    currentRoomName = "lounge";

    activeRoomsObject.waitListArray.forEach((player) => {
        switchRooms(currentRoomName, nextRoomName, player);
    });

    const roomcount = activeRoomsObject.getRoomCount(nextRoomName);

    console.log(roomcount);

    return { nextRoomName };
}

module.exports = waitListJoinsRoom;
