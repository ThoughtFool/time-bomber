const activeRoomsObject = {

    "waitListArray": [], 
    
    "lounge": {
        playerListArray: [
            "Oberon",
            "Tennessee",
            "Orion",
            "Skittles",
            "Whiskers",
        ],
    },
    "12345": {
        playerListArray: ["Oniim", "Glylm"],
    },
    "new-room": {
        playerListArray: [
            {
                username: "Oberon",
                currentRoom: "new-room",
            },
            {
                username: "Glylm",
                currentRoom: "new-room",
            },
        ],
        open: true,
        active: true,
    },
    getRoomCount: function (roomName) {
        return this[roomName].playerListArray.length;
    },
};

module.exports = activeRoomsObject;