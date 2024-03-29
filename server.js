const express = require("express");
const app = express();

const http = require("http");
const { join } = require("path");
const path = require("path");

const socketIO = require("socket.io");

const port = process.env.PORT || 8081;

const roomData = {
    roomCounter: 1, // currently open room. counter increment when two enter room
    rooms: [{
        players: ["quincy taggert", "jason nesmith"],
        roomID: "Room: 0",
        open: false
    },
    {
        players: ["tech sargeant chen"],
        roomID: "Room: 1",
        open: true
    }],
    isAvailable: function (newPlayer) {
        if (this.players.length < 1) {
            this.players.push(newPlayer);
        } else if (this.players.length < 2) {
            this.players.push(newPlayer);
            roomData.roomCounter++;
        } else {
            
        };
    },
    findRoom: function () {
        for (var i = 0; i < this.rooms.length; i++) {
            if (this.rooms[i].open === true) {
                return this.rooms[i]; //indexOf()
            };
        };
        return this.createRoom();
    },
    search: function (nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].name === nameKey) {
                return myArray[i];
            }
        }
    }
};

app.set('view engine', 'ejs');

const server = http.createServer(app);
const io = socketIO(server);
let dropCount = 0;
let initNum = 0;

app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => {
    res.render('splash');
});

app.get('/game', (req, res) => {
    res.render('index');
});

io.on("connection", (socket) => {
    console.log(`A user is connected. Please welcome user: ${socket.id}.`);

    socket.on("enterRoom", () => {
        const roomNames = [];
        for (const id in rooms) {
            const { name } = rooms[id];
            const room = { name, id };
            roomNames.push(room);
        };
        cb(roomNames);
        io.emit("enterRoom");
    });

    socket.on("createRoom", (roomName, cb) => {
        const room = {
            id: uuid(),
            name: roomName,
            sockets: []
        };
        rooms[room.id] = room;

        // socket joins the new room:
        joinRoom(socket, room);
        cb();

        io.emit("createRoom");
    });

    socket.on("joinRoom", (data, cb) => {
        const roomNames = [];
        for (const id in rooms) {
            const {name} = rooms[id];
            const room = {name, id};
            roomNames.push(room);
        };
        cb(roomNames);
        io.emit("joinRoom");
    });

    // socket.join(`Room: ${roomData.roomCounter}`);

    socket.on("startGame", () => {
        io.emit("startGame");
    });

    socket.on("disconnect", () => {
        console.log(`A user has disconnected. Please come back soon, user: ${socket.id}.`);
    });

    socket.on("addBombNow", (data) => {
        // console.log("data");
        // console.log(data);
        socket.emit("addBombNow", data);
        data.bombClass = "invisible";
        data.activeBomb = "active";
        // console.log("data-2");
        // console.log(data);
        socket.broadcast.emit("addBombNow", data);
    });

    socket.on("explosion", (data) => {
        socket.emit("explosion", data);

        // send update to all users except initiator:
        data.status = "remove";
        socket.broadcast.emit("explosion", data);
    });

    socket.on("displayStats", (data) => {
        socket.broadcast.emit("displayStats", data);
    });

    socket.on("randomDrop", (data) => {

        let dropItemsArr = ["heart", "ghost", "glove"];
        // dropCount = data.dropCount;

        console.log("initNum");
        console.log(initNum);
        console.log("dropCount");
        console.log(dropCount);

        if (initNum >= 1 && initNum % 2 !== 0) {
            randomDrop(data);

        } else if (data.missed === false) {
            randomDrop(data);

        } else {
            console.log(data);
        };

            function randomDrop(data) {
                let randomDropBoxIndex = Math.floor(Math.random() * data.itemBoxCoords.length);
                let randDropBoxID = data.itemBoxCoords[randomDropBoxIndex].id;
                console.log("randDropBoxID");
                console.log(randDropBoxID);

                let randomItemIndex = Math.floor(Math.random() * dropItemsArr.length);
                let randDropItem = dropItemsArr[randomItemIndex];
                randomTime(randDropBoxID, randDropItem);

                // get array of bomb drops
                // use randomized dice throw to determine how much time before next drop
                // Math.random() decides which item to throw
                // calls function to place items

                function randomTime(randDropBoxID, randDropItem) {
                    // boxDropID, dropClass, dropCount
                    console.log("Randomized Drops");
                    let milliseconds = 1000;
                    randomTimeout = Math.floor(Math.random() * 10 + 5) * milliseconds;
                    console.log("randomTimeout");
                    console.log(randomTimeout);
                    // randomDrop(randomItemIndex, dropItemArr, data);

                    // if (dropCount <= 1) {
                    //     dropCount++;
                        setTimeout(async () => {
                            await io.emit("randomDrop", {
                                randID: randDropBoxID,
                                randItem: randDropItem,
                                dropCount: dropCount
                            });
                            
                        }, randomTimeout);
                    // };
                };
            };
        // };
        initNum++;
    });

    // function switchUserInfo ()

    socket.on("grabDrop", (data) => {

        // if (dropCount > 0 && dropCount < 2) {
        //     dropCount--;
        //     data.dropCount = dropCount;
        //     console.log("after");
        //     console.log(data.dropCount);
        // };

        if (data.status === "missed") {
            io.emit("grabDrop", data);

        } else {
            socket.emit("grabDrop", data); //status = "upgrade"

            // send update to all users except initiator:
            data.status = "lost";
            socket.broadcast.emit("grabDrop", data);
        };
    });
});

server.listen(port, () => console.log(`Time Bomber app listening on port ${port}!`));

// const socket = io({
//     auth: (cb) => {
//         cb(localStorage.getItem("token"));
//     }
// });