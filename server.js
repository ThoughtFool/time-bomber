if (process.env.NODE_ENV === "development") {
require("dotenv").config();
}

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const expressEjsLayout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

require("./config/passport")(passport);

const http = require("http");
const path = require("path");

const socketIO = require("socket.io");

const PORT = process.env.PORT;

const botName = "Boom-Bot";

const formatMsg = require("./utils/messages");
const {
    joinWaitList,
    removeWaitList,
    activeRoomsObject,
    addPlayerToRoom,
} = require("./room-logic/index");

const {
    userJoin,
    getCurrentUser,
    userLeaves,
    getRoomUsers,
} = require("./utils/users");

// ====================== mongoose ======================

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connected to database"))
    .catch((err) => console.log(err));
// ====================== EJS ======================

app.set("view engine", "ejs");
app.use(expressEjsLayout);

// config:
//BodyParser
app.use(express.urlencoded({ extended: false }));

// ====================== express session ======================
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

// ====================== use flash ======================

app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

// ====================== Routes ======================

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/rooms", require("./routes/rooms"));

// ====================== PRE 2022 ======================
// ====================== ADD TO DB ======================

// TODO: store data to be repopulated upon disconnect or refresh:
const roomData = {
    roomCounter: 1, // currently open room. counter increment when two enter room
    rooms: [
        {
            players: ["quincy taggert", "jason nesmith"],
            roomID: "Room: 0",
            open: false,
        },
        {
            players: ["tech sargeant chen"],
            roomID: "Room: 1",
            open: true,
        },
    ],
    isAvailable: function (newPlayer) {
        if (this.players.length < 1) {
            this.players.push(newPlayer);
        } else if (this.players.length < 2) {
            this.players.push(newPlayer);
            roomData.roomCounter++;
        } else {
        }
    },
    findRoom: function () {
        for (var i = 0; i < this.rooms.length; i++) {
            if (this.rooms[i].open === true) {
                return this.rooms[i]; //indexOf()
            }
        }
        return this.createRoom();
    },
    search: function (nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].name === nameKey) {
                return myArray[i];
            }
        }
    },
};

// ====================== SOCKET IO ======================

const server = http.createServer(app);
const io = socketIO(server);
let dropCount = 0;
let initNum = 0;

app.use(express.static(path.join(__dirname + "/public")));

// app.get('/splash', (req, res) => {
//     res.render('splash');
// });

// app.get('/game', (req, res) => {
//     res.render('index');
// });

// ====================== SOCKET IO COMMUNICATION ======================
// TODO: use mongoose:
let clients = [];

io.on("connection", (socket) => {
    // socket.on("join server", (username) => {
    //     const newUser = {
    //         username,
    //         id: socket.id,
    //     };
    //     socketUsers.push(newUser);
    // } );

    console.log(`A user is connected. Please welcome user: ${socket.id}.`);

    // save player info to socket:

    // socket.username = username;
    socket.room = "lounge";
    socket.join(socket.room);

    // socket.to(socket.room).emit(
    //     "sendMsg",
    //     "server",
    //     `You are connected to room: ${socket.room}`
    // );

    // ====================== Join wait list (socket) ======================

    socket.on("join wait list", async (obj) => {
        console.log(obj.username);
        console.log(activeRoomsObject);

        let ready = await joinWaitList(obj.username);
        console.log(activeRoomsObject.getRoomCount("lounge"));
        if (!ready) {
            socket.emit("waiting for other players", {
                loungeCount: activeRoomsObject.getRoomCount("lounge"),
            });
            return;
        } else {
            alertPlayers(ready);
            countdownClock();
        }
    });

    // ====================== Remove wait list (socket) ======================

    socket.on("remove from wait list", async (obj) => {
        console.log(obj.username);
        console.log(activeRoomsObject);

        let ready = await removeWaitList(obj.username);
        console.log(activeRoomsObject.getRoomCount("lounge"));
        if (!ready) {
            socket.emit("remove wait list button", {
                loungeCount: activeRoomsObject.getRoomCount("lounge"),
            });
            return;
        }
    });

    // ====================== Welcome to Lounge (socket) ======================

    socket.on("add player to lounge", (data) => {
        console.log("received msg: add player to lounge");

        const user = userJoin(socket.id, data.username, data.room);

        // Join to room:
        socket.join(user.room);

        console.log("=============");
        console.log(data.room);
        console.log(user.room);
        console.log("=============");

        // Welcome current user/clent:
        socket.emit(
            "message",
            formatMsg(
                botName,
                `Hey ${user.username}, welcome to the Time Bomber: Game Lounge.`
            )
        );

        // Broadcast when users/clents connect (to everyone except current user/client):
        socket.broadcast
            .to(user.room)
            .emit(
                "message",
                formatMsg(
                    botName,
                    `There's another player in the Game Lounge! ${user.username} has joined the chat.`
                )
            );
        // (to everyone including current client):
        // io.emit();

        // Send users and room info to sidebar:
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
        });

        addPlayerToRoom("lounge", data.username);
    });

    socket.on("saveClientInfo", (data) => {
        var clientInfo = new Object();
        console.log(data);
        clientInfo.customId = data.userGameID;
        clientInfo.clientId = socket.id;
        clients.push(clientInfo);
        console.log(clients);
    });

    socket.on("confirmation response", async (response) => {
        console.log("confirmation response");
        console.log({ response });
        await addConfirmation(response);
    });

    // socket.emit("connecting", {id: socket.id});

    // socket.on("enterRoom", () => {
    //     const roomNames = [];
    //     for (const id in rooms) {
    //         const { name } = rooms[id];
    //         const room = { name, id };
    //         roomNames.push(room);
    //     }
    //     cb(roomNames);
    //     io.emit("enterRoom");
    // });

    // ====================== Create Room (socket) ======================

    socket.on("createRoom", (room, cb) => {
        const roomName = {
            id: uuid(),
            name: room,
            sockets: [],
        };
        rooms[room.id] = room;

        // socket joins the new room:
        joinRoom(socket, roomName);
        cb();

        io.emit("createRoom");
    });

    // ====================== Join Room (socket) ======================

    // socket.on("joinRoom", (data, cb) => {
    //     const roomNames = [];
    //     for (const id in rooms) {
    //         const { name } = rooms[id];
    //         const room = { name, id };
    //         roomNames.push(room);
    //     }
    //     cb(roomNames);
    //     io.emit("joinRoom");
    // });

    // socket.join(`Room: ${roomData.roomCounter}`);

    // ====================== Listen for chatMessage ======================

    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);

        // console.log(msg);
        // io.to(user.room).emit("message", formatMsg(user.username, msg));
        socket.emit("message", formatMsg("me", msg));
        socket.broadcast
            .to(user.room)
            .emit("message", formatMsg(user.username, msg));
    });

    // ====================== Start Game (socket) ======================

    socket.on("startGame", () => {
        // socket.emit("startGame");
        console.log("startGame message received");
    });

    function startGameFuncTest() {
        // alert("player has left waitlist");
        socket.emit("startGame", { username });
    }

    // ====================== Disconnect (socket) ======================

    socket.on("disconnect", () => {
        console.log(
            `A user has disconnected. Please come back soon, user: ${socket.id}.`
        );

        const user = userLeaves(socket.id);

        if (user) {
            io.to(user.room).emit(
                "message",
                formatMsg(
                    botName,
                    `One less player is in the game lounge. ${user.username} has left the chat.`
                )
            );

            // ====================== Remove users and room info from sidebar ======================

            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            });
        }
    });

    // ====================== Add Bomb to Game Field (socket) ======================

    const myBombDrops = [];

    socket.on("addBombNow", (data) => {
        console.log("data.bombDropCount");
        console.log(data.bombDropCount);

        // ====================== Add "inactive" bomb to initiating player ======================
        socket.emit("addBombNow", data);
        data.bombClass = "invisible";
        data.activeBomb = "active";

        console.log("data-2");
        console.log(data);

        // ====================== Add "active" bomb to all other players ======================
        socket.broadcast.emit("addBombNow", data);

        myBombDrops.push(data);

        setTimeout(async () => {
            console.log("data.boxDropID");
            console.log(data.boxDropID);
            console.log(myBombDrops[0]);

            // EXAMPLE DATA:
            // bombDropCount: 0,
            // boxDropID: 'drop-box-4',
            // bombClass: 'glow',
            // activeBomb: 'inactive'

            await io.emit("diffuseBomb", data);
        }, 5000);
    });

    // ====================== Diffuse Bomb & Remove (socket) ======================

    socket.on("diffuseBomb", (data) => {
        // data.status = "remove and rearm";
        // socket.emit("diffuseBomb", data);

        data.status = "remove";
        io.emit("diffuseBomb", data);
    });

    // ====================== Detonate Bomb in Game Field (socket) ======================

    socket.on("explosion", (data) => {
        socket.emit("explosion", data);

        // send update to all users except those that detonated bomb:
        // data.status = "remove";
        data.status = "reveal and remove";
        socket.broadcast.emit("explosion", data);
    });

    // ====================== Display Player Stats (socket) ======================

    socket.on("displayStats", (data) => {
        socket.broadcast.emit("displayStats", data);
    });

    // ====================== Add Random Drop to Game Field (socket) ======================

    socket.on("randomDrop", (data) => {
        let dropItemsArr = ["heart", "ghost", "glove"];
        // dropCount = data.dropCount;

        // console.log("initNum");
        // console.log(initNum);
        // console.log("dropCount");
        // console.log(dropCount);

        if (initNum >= 1 && initNum % 2 !== 0) {
            randomDrop(data);
        } else if (data.missed === false) {
            randomDrop(data);
        } else {
            console.log(data);
        }

        function randomDrop(data) {
            let randomDropBoxIndex = Math.floor(
                Math.random() * data.itemBoxCoords.length
            );
            let randDropBoxID = data.itemBoxCoords[randomDropBoxIndex].id;
            console.log("randDropBoxID");
            console.log(randDropBoxID);

            let randomItemIndex = Math.floor(
                Math.random() * dropItemsArr.length
            );
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
                randomTimeout =
                    Math.floor(Math.random() * 10 + 5) * milliseconds;
                console.log("randomTimeout");
                console.log(randomTimeout);
                // randomDrop(randomItemIndex, dropItemArr, data);

                // if (dropCount <= 1) {
                //     dropCount++;
                setTimeout(async () => {
                    await io.emit("randomDrop", {
                        randID: randDropBoxID,
                        randItem: randDropItem,
                        dropCount: dropCount,
                    });
                }, randomTimeout);
                // };
            }
        }
        // };
        initNum++;
    });

    // function switchUserInfo ()
    socket.on("bombTimeout", (data) => {
        // if (dropCount > 0 && dropCount < 2) {
        //     dropCount--;
        //     data.dropCount = dropCount;
        //     console.log("after");
        //     console.log(data.dropCount);
        // };

        if (data.status === "missed") {
            io.emit("bombTimeout", data);
        } else {
            socket.emit("bombTimeout", data); //status = "upgrade"

            // send update to all users except initiator:
            data.status = "lost";
            socket.broadcast.emit("bombTimeout", data);
        }
    });

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
        }
    });

    function alertPlayers({ nextRoomName }, next) {
        socket.emit("wait is over", {
            players: activeRoomsObject[nextRoomName].playerListArray,
            nextRoomName: nextRoomName,
        });

        socket.broadcast.emit("wait is over", {
            players: activeRoomsObject[nextRoomName].playerListArray,
            nextRoomName: nextRoomName,
        });
    }

    socket.on("game over", () => {
        io.emit("game over");
    });

    function countdownClock() {
        console.log("countdown started!");

        let seconds = 20;
        console.log(seconds);

        function incrementSeconds() {
            if (seconds <= 0) {
                clearInterval(countdownInterval);
                getResponseConfirmation();
            } else {
                seconds -= 1;
                // document.getElementById("timer").innerText = seconds;
                io.emit("render countdown clock", { seconds });
            }
        }

        countdownInterval = setInterval(incrementSeconds, 1000);
        // countdownToStart = setTimeout(startGameFuncTest, 10000);
    }

    function getResponseConfirmation() {
        console.log("getResponseConfirmation");
        const user = getCurrentUser(socket.id);
        console.log(socket.id);

        io.emit("get play game confirmation", { socketId: user.id });
    }

    let responseArray = [];
    async function addConfirmation(response) {
        const { activeRoomsObject } = require("./room-logic/index");
        const { confirmation, username, socketId } = response;
        // response.id = socket.id;
        console.log({ confirmation });
        console.log({ username });
        console.log({ socketId });
        console.log(`After: ${activeRoomsObject.responseArray.length}`);

        if (activeRoomsObject.responseArray.length < 2) {
            activeRoomsObject.responseArray.push(response);
            console.log(activeRoomsObject.responseArray);
        } else {
            console.log("too many or too little");
        }

        console.log(`After: ${activeRoomsObject.responseArray.length}`);

        if (activeRoomsObject.responseArray.length >= 2) {
            await handleResponse(activeRoomsObject.responseArray);
            activeRoomsObject.responseArray = [];
        }
    }

    function handleResponse([p1, p2]) {
        console.log("handleResponse function fires");
        console.log({ p1 });
        console.log({ p2 });
        if (p1.confirmation === "true" && p2.confirmation === "true") {
            io.emit("start game", activeRoomsObject.responseArray);
            // app.get('/game', (req, res) => {
            //     res.render('index');
            // });
        } else if (
            (p1.confirmation === "true" && p2.confirmation === "false") ||
            (p1.confirmation === "true" && p2.confirmation === null)
        ) {
            console.log("p1 = true, p2 = false/null");

            io.to(p1.socketId).emit("opponent did not confirm", activeRoomsObject.responseArray);
            io.to(p2.socketId).emit("you did not confirm", activeRoomsObject.responseArray);
        } else if (
            (p1.confirmation === "false" && p2.confirmation === "true") ||
            (p1.confirmation === null && p2.confirmation === "true")
        ) {
            console.log("p1 = false/null, p2 = true");

            io.to(p2.socketId).emit("opponent did not confirm", activeRoomsObject.responseArray);
            io.to(p1.socketId).emit("you did not confirm", activeRoomsObject.responseArray);
        } else if (
            (p1.confirmation === "false" && p2.confirmation === "false") ||
            (p1.confirmation === null && p2.confirmation === null)
        ) {
            console.log("p1 = false/null, p2 = false/null");

            io.emit("you did not confirm", activeRoomsObject.responseArray);
        } else {
        }
    }
});

function stopCountdownClock() {
    // TODO: emit to user to return to lounge.
    // TODO: emit to other users to return to lounge and ask to be added to waitlist again.
    clearInterval(countdownInterval);
    clearTimeout(countdownToStart);
}

server.listen(PORT, () =>
    console.log(`Time Bomber app listening on PORT ${PORT}!`)
);

// const socket = io({
//     auth: (cb) => {
//         cb(localStorage.getItem("token"));
//     }
// });
