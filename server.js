const express = require("express");
const app = express();

const http = require("http");
const path = require("path");

const socketIO = require("socket.io");

const port = process.env.PORT || 8081;

const server = http.createServer(app);
const io = socketIO(server);
let dropCount = 0;
let initNum = 0;

app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => {
    res.render('index.html');
});



io.on("connection", (socket) => {
    console.log(`A user is connected. Please welcome user: ${socket.id}.`);

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

        if (initNum >= 1 && data.dropCount <= 1) {
        // if (initNum >= 1 && data.missed >= 1) {

            randomDrop(data);

            function randomDrop(data) {
                let randomDropBoxIndex = Math.floor(Math.random() * data.itemBoxCoords.length);
                let randDropBoxID = data.itemBoxCoords[randomDropBoxIndex].id;
                console.log("randDropBoxID");
                console.log(randDropBoxID);

                let randomItemIndex = Math.floor(Math.random() * 2);
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

                    dropCount++;
                    setTimeout(async () => {
                        if (dropCount <= 1) {
                            await io.emit("randomDrop", {
                                randID: randDropBoxID,
                                randItem: randDropItem,
                                dropCount: dropCount
                            });
                        };
                    }, randomTimeout);
                };
            };
        };
        initNum++;
    });

    // function switchUserInfo ()

    socket.on("grabDrop", (data) => {
        
        if (dropCount > 0) {
            dropCount--;
            data.dropCount = dropCount;
            console.log("after");
            console.log(data.dropCount);
        };

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