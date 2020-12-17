const express = require("express");
const app = express();

const http = require("http");
const path = require("path");

const socketIO = require("socket.io");

const port = process.env.PORT || 8081;

const server = http.createServer(app);
const io = socketIO(server);

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

    // function switchUserInfo ()
});

server.listen(port, () => console.log(`Time Bomber app listening on port ${port}!`));

// const socket = io({
//     auth: (cb) => {
//         cb(localStorage.getItem("token"));
//     }
// });