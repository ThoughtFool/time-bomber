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
    console.log("A user is connected.");
    
    socket.on("startGame", () => {
        io.emit("startGame");
    });
    
    socket.on("disconnect", () => {
        console.log("A user has disconnected.");
    });
    
    socket.on("addBombNow", (data) => {
        console.log("data");
        console.log(data);
        io.emit("addBombNow", data);
    });
});

server.listen(port, () => console.log(`Time Bomber app listening on port ${port}!`));