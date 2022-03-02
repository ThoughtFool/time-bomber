async function joinWaitList(username) {
    let { waitListJoinsRoom, activeRoomsObject } = require(".");

    if (activeRoomsObject.waitListArray.length < 2) {
        activeRoomsObject.waitListArray.push(username);
    } else {
        console.log("too many or too little");
    }

    if (activeRoomsObject.waitListArray.length >= 2) {
        const readyObj = await waitListJoinsRoom(activeRoomsObject.waitListArray);
        activeRoomsObject.waitListArray = [];
        return readyObj;
    } else {
        return null;
    }
}

module.exports = joinWaitList;
