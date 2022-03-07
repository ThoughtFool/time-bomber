let socket = io();

let usernameSpan = document.getElementById("username-span");
let username = usernameSpan.getAttribute("data-username");
const chatForm = document.getElementById("chat-form");
const chatDiv = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");
const waitListed = document.getElementById("wait-listed");
const cancelWaitListBtn = document.getElementById("remove-me-from-wait-list");

socket.on("connect", () => {
    localStorage.setItem("username", username);
    let idString = Date.now().toString();
    socket.userGameID = idString;
    socket.username = username;

    console.log("client connected");

    socket.emit("add player to lounge", {
        username,
        userGameID: idString,
        room: "lounge",
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
waitListBtn.addEventListener("click", addMeToWaitList);
cancelWaitListBtn.addEventListener("click", removeMeFromWaitList);;

function addMeToWaitList() {
    console.log("click event fires!");
    socket.emit("join wait list", { username });
};

function removeMeFromWaitList() {
    console.log("click event fires!");
    socket.emit("remove from wait list", { username });
};

console.log("hello, world!");

// socket.join("lounge");

// socket.to("lounge").emit("join lounge", { username });

socket.on("wait is over", () => {
    waitListed.innerText = "";
    waitIsOverModal();
});

socket.on("waiting for other players", () => {
    // waitListBtn.removeEventListener("click", addMeToWaitList);
    waitListBtn.style.display = "none";
    cancelWaitListBtn.style.display = "block";
    waitingForPlayers();
});
// Modal placeholder:

// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close-modal")[0];

// When the user clicks on the button, open the modal
function waitIsOverModal() {
    modal.style.display = "block";
    // TODO: place countdown on server thru emit msg:
    // socket.emit("countdown started", { username });
    countdownClock();
}

function waitingForPlayers() {
    waitListed.innerText = "waiting for opponent...";
}

let countdownToStart;
let countdownInterval;

// ====================== Function to Start Game for Waitlist Players ======================

function startGameFuncTest() {
    alert("player has left waitlist");
}

// ====================== Function to Set Interval and Timeout ======================

function countdownClock() {
    console.log("countdown started!");

    let seconds = 10;

    function incrementSeconds() {
        if (seconds <= 0) {
            clearInterval(countdownInterval);
        } else {
            seconds -= 1;
            document.getElementById("timer").innerText = seconds;
        }
    }

    countdownInterval = setInterval(incrementSeconds, 1000);
    countdownToStart = setTimeout(startGameFuncTest, 10000);
}

// ====================== Clear Interval and Timeout ======================

function stopCountdownClock() {
    // TODO: emit to user to return to lounge.
    // TODO: emit to other users to return to lounge and ask to be added to waitlist again.
    clearInterval(countdownInterval);
    clearTimeout(countdownToStart);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    stopCountdownClock();
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// };

// ====================== Get room and users ======================

socket.on("roomUsers", ({ room, users }) => {
    console.log("room");
    console.log(room);
    console.log("users");
    console.log(users);

    outputRoomName(room);
    outputUsers(users);
});

// Message from server:
socket.on("message", (message) => {
    console.log(
        `Msg: username: ${message.username}, time: ${message.time}, text: ${message.text}`
    );
    outputMsg(message);

    // Auto-scroll down:
    chatDiv.scrollTop = chatDiv.scrollHeight;
});

// Message submit:
chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("chatForm submit");
    console.log(event.target.elements.msg.value);

    // Get message text:
    const msg = event.target.elements.msg.value;
    // console.log("msg:");
    // console.log(msg);

    // Emit message to server:
    socket.emit("chatMessage", msg);

    // Clear input field:
    event.target.elements.msg.value = "";
    event.target.elements.msg.focus();
});

// Output message to DOM:
function outputMsg(message) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("message");
    newDiv.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    chatDiv.appendChild(newDiv);
}

// Add room name to DOM:
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add user list to DOM:
function outputUsers(users) {
    userList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join("")}
    `;
    // console.log(users);
}
