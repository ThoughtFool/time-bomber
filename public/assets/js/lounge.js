let socket = io();

let usernameSpan = document.getElementById("username-span");
let username = usernameSpan.getAttribute("data-username");

socket.on("connect", () => {
    localStorage.setItem("username", username);
    let idString = Date.now().toString();

    console.log("client connected");

    socket.emit("add player to lounge", {
        username,
        userGameID: idString,
    });
});

socket.on("disconnect", () => {
    localStorage.setItem("username", "");
    socket.emit("remove player from lounge", {
        username,
        userGameID: idString,
    });
});

// TODO: create seperate javascript files for frontend pages and getUsername function:
const waitListBtn = document.getElementById("add-me-to-wait-list");
// console.log(waitListBtn);
waitListBtn.addEventListener("click", () => {
    console.log("click event fires!");
    socket.emit("join wait list", { username });
});

console.log("hello, world!");

// socket.join("lounge");

// socket.to("lounge").emit("join lounge", { username });


socket.on("wait is over", () => {
    waitIsOverModal();
});

// Modal placeholder:

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function waitIsOverModal() {
    
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
