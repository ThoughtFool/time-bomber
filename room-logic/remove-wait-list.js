async function removeWaitList(username) {
    let { activeRoomsObject } = require(".");

    let playerIndex = activeRoomsObject.waitListArray.indexOf(username);
    activeRoomsObject.waitListArray.splice(playerIndex, 1);
    console.log("wait list length");
    console.log(activeRoomsObject.waitListArray.length);

    return null;

    // const readyObj = await waitListLeavesRoom(
    // //         activeRoomsObject.waitListArray
    // //     );



    // if (activeRoomsObject.waitListArray.length < 2) {
    //     activeRoomsObject.waitListArray.push(username);
    // } else {
    //     console.log("too many or too little");
    // }

    // if (activeRoomsObject.waitListArray.length >= 2) {
    //     const readyObj = await waitListJoinsRoom(
    //         activeRoomsObject.waitListArray
    //     );
    //     activeRoomsObject.waitListArray = [];
    //     return readyObj;
    // } else {
    //     return null;
    // }
}

module.exports = removeWaitList;
