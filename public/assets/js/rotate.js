let socket = io();
var hazRunner = document.getElementById("clock-runner");

// Create a random filter class for hazRunner:
const filterArr = ["invert", "huerotate", "saturate", "sepia", "original"];
let randomIndex = Math.floor(Math.random() * filterArr.length);
let randomFilter = filterArr[randomIndex];

hazRunner.classList.add(randomFilter);

// var dropDiv = document.getElementById("dropper");
var container = document.querySelector(".container");
// var container = document.getElementById("game-screen");
var btn = document.getElementById("btn");
var loopRight;
var loopLeft;
var degrees = 0;
let dropCount = 0;
let bombDropCount = 0;
var x;
var y;

let itemBoxCoords = [];

let user = {
    health: 100,
    bombCount: 5,
};

let opponent = {
    health: 100,
    bombCount: 5,
};

let zone = {
    active: false,
    bombID: "",
    bombLoc: "",
    drop: false,
};

let usernameSpan = document.getElementById("username-span");
let username = usernameSpan.getAttribute("data-username");

socket.on("connect", () => {
    localStorage.setItem("username", username);
    let idString = Date.now().toString();
    socket.emit("saveClientInfo", {
        username,
        userGameID: idString,
    });
});

socket.on("disconnect", () => {
    localStorage.setItem("username", "");
});

// // global test vars:
// bodyRectLeft = 0;
// containerRectLeft = 0;
// bodyWidth = 0;
// bodyHeight = 0;
// containerWidth = 0;
// bombWidth = 0;

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyB9uhfnF8ZvC9DsfkXfxVv6h8Mvr9Yab70",
//     authDomain: "time-bomber.firebaseapp.com",
//     databaseURL: "https://time-bomber.firebaseio.com",
//     projectId: "time-bomber",
//     storageBucket: "time-bomber.appspot.com",
//     messagingSenderId: "573647981740",
//     appId: "1:573647981740:web:e54c102ed619d89b7d6309"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// const database = firebase.database();

// database.ref().on("change", function (snap) {
//
// });

function spawnBomb(dropCount, boxDropID, bombClass, activeBomb) {
    let bomb = document.createElement("DIV");
    bomb.classList.add("bomb", bombClass, activeBomb);
    // bomb.classList.add("bomb", "glow");
    bomb.setAttribute("id", `bomb-${dropCount}`);

    let boxToDrop = document.getElementById(boxDropID);
    boxToDrop.append(bomb);
    boxToDrop.classList.remove("empty");
    boxToDrop.classList.add(bombClass);
    boxToDrop.classList.add("boom-box");
}

function spawnDrop(boxDropID, dropClass, dropCount) {
    let randDrop = document.createElement("DIV");
    randDrop.classList.add("rand-drop", dropClass, `${dropClass}-pulse`);
    // drop.classList.add("randDrop", "glow");
    randDrop.setAttribute("id", `randDrop-${dropCount}`);

    let boxToDrop = document.getElementById(boxDropID);
    boxToDrop.append(randDrop);
    boxToDrop.classList.add("heart-wrapper");
    boxToDrop.classList.add(dropClass);
    boxToDrop.classList.add("random-drop");

    let second = 1000;
    setTimeout(() => {
        socket.emit("grabDrop", {
            dropID: "",
            dropLoc: boxDropID,
            status: "missed",
            dropCount: dropCount,
        });
    }, 10 * second);
    // };
}

socket.on("addBombNow", (data) => {
    spawnBomb(data.dropCount, data.boxDropID, data.bombClass, data.activeBomb);
});

socket.on("diffuseBomb", (data) => {
    console.log("{data}");
    console.log({ data });
    data.status = "remove";
    explode(data.status, data.boxDropID, data.boxDropID);
});

socket.on("explosion", (data) => {
    console.log({ data });
    explode(data.status, data.bombID, data.bombLoc);
});

socket.on("bombTimeout", (data) => {
    dropCount = data.dropCount;
    // TODO: subtract from drop count

    // if (data.dropCount > 0) {
    explode(data.status, data.dropID, data.dropLoc);
    // };
    // status:
    // "upgrade"
    // "missed"
});

socket.on("grabDrop", (data) => {
    dropCount = data.dropCount;

    // if (data.dropCount > 0) {
    explode(data.status, data.dropID, data.dropLoc);
    // };
    // status:
    // "upgrade"
    // "missed"
});

socket.on("displayStats", (data) => {
    displayStats("toOpponent", data.user);
    console.info("data.user");
    console.info(data.user);
});

socket.on("randomDrop", (data) => {
    // dropCount = data.dropCount;

    console.log("random drop data, returned from server");
    console.log(data);
    // console.log(bombCount);
    data.dropCount++;
    dropCount = data.dropCount;

    // if (dropCount <= 1) {
    // data.dropCount = dropCount;
    spawnDrop(data.randID, data.randItem, data.dropCount);
    // };

    // setTimeout(async () => {
    //     if (dropCount < 1) {
    //         await socket.emit("randomDrop", {
    //             itemBoxCoords: itemBoxCoords,
    //             dropCount: dropCount
    //         });
    //     };
    // }, 10000);
});

async function naviCtrl(value) {
    if (value.key === "ArrowDown" || value.target.id === "nav-down") {
        // clockDrop = document.getElementById("clock");
        // bomb = this.createElement("DIV");
        // bomb.classList.add("bomb");
        // bomb.setAttribute("id", `bomb-${dropCount}`);
        // container.append(bomb);
        //////////////////////////////////////////////////////
        // create cartesian coord function to check if (x, y) are inside of boxDrop array
        console.log("=================== itemBoxArray ===================");

        function coordChecker(dropperID) {
            let dropper = document.getElementById(dropperID);
            let dropperRect = dropper.getBoundingClientRect();
            let itemBoxArray = document.querySelectorAll(".item-box");
            for (let i = 0; i < itemBoxArray.length; i++) {
                let dropArrItem = itemBoxArray[i].getBoundingClientRect();

                if (
                    dropArrItem.left < dropperRect.right &&
                    dropArrItem.right > dropperRect.left &&
                    dropArrItem.top < dropperRect.bottom &&
                    dropArrItem.bottom > dropperRect.top
                ) {
                    return itemBoxArray[i].id;
                }
            }
        }

        //////////////////////////////////////////////////////
        // console.log(coordChecker("dropper"));
        const boxToDrop = document.getElementById(
            await coordChecker("dropper")
        );

        if (boxToDrop.classList.contains("empty") && bombDropCount <= 5) {
            bombDropCount++;

            socket.emit("addBombNow", {
                bombDropCount: bombDropCount,
                boxDropID: boxToDrop.id,
                bombClass: "glow",
                activeBomb: "inactive",
                // boxToDrop.append(bomb);
                // boxToDrop.classList.remove("empty");
                // boxToDrop.classList.add("boom");
            });
            // TODO: when bomb timer runs out or explodes --> boxToDrop.classList.add("empty");
            //////////////////////////////////////////////////////
            // save location to respective spot on clock-map (for socket):
            // function mapDrop(dropLocID) {
        }

        // } else if (value.key === "ArrowUp" || value.target.id === "nav-up") {
        //     // dropDiv.style.backgroundImage = "url('')";
        // TODO: add animation for forward-facing hazmat runner:
        //     hazRunner.style.background = "url('../assets/images/hazmat-runner-frontside-single.png')";
        //     hazRunner.classList.remove("move-left");
        //     hazRunner.classList.remove("move-right");
        //     hazRunner.classList.remove("move-forward");
        //     hazRunner.classList.remove("move-backward");
        //     hazRunner.classList.add("move-backward");
    } else if (value.key === "ArrowRight" || value.target.id === "nav-right") {
        // dropDiv.style.backgroundImage = "url('')";
        hazRunner.style.background =
            "url('../assets/images/clock-runner-xs-R.png')";
        hazRunner.classList.remove("move-left");
        hazRunner.classList.remove("move-right");
        hazRunner.classList.remove("move-forward");
        hazRunner.classList.remove("move-backward");
        hazRunner.classList.add("move-right");
        rotateAnimationRight("clock-runner", 50);
    } else if (value.key === "ArrowLeft" || value.target.id === "nav-left") {
        // dropDiv.style.backgroundImage = "url('')";
        hazRunner.style.background =
            "url('../assets/images/clock-runner-xs-L.png')";
        hazRunner.classList.remove("move-left");
        hazRunner.classList.add("move-left");
        hazRunner.classList.remove("move-right");
        hazRunner.classList.remove("move-forward");
        hazRunner.classList.remove("move-backward");
        rotateAnimationLeft("clock-runner", 50);
    } else if (value.key === "i" || value.key === "I") {
        clockDrop = document.getElementById("clock");
        bomb = this.createElement("DIV");
        bomb.classList.add("bomb");
        clockDrop.append(bomb);
    } else if (value.key === "j" || value.key === "J") {
        clockDrop = document.getElementById("clock");
        bomb = this.createElement("DIV");
        bomb.classList.add("bomb");
        clockDrop.append(bomb);
    } else if (value.key === "k" || value.key === "K") {
        clockDrop = document.getElementById("clock");
        bomb = this.createElement("DIV");
        bomb.classList.add("bomb");
        clockDrop.append(bomb);
    } else if (value.key === "l" || value.key === "L") {
        clockDrop = document.getElementById("clock");
        bomb = this.createElement("DIV");
        bomb.classList.add("bomb");
        clockDrop.append(bomb);
    }
}

document.addEventListener("touchstart", naviCtrl, false);

document.addEventListener("keydown", naviCtrl, false);

// document.addEventListener("click", function (e) {
//     xPos = e.clientX;
//     yPos = e.clientY;

//     clockDrop = document.getElementById("clock");
//     bomb = this.createElement("DIV");
//     bomb.classList.add("bomb");
//     container.append(bomb);

//     bomb.style.left = xPos + "px";
//     bomb.style.top = yPos + "px";
// });

function rotateAnimationRight(el, speed) {
    elem = document.getElementById(el);
    elem.style.transform = "rotate(" + degrees + "deg)";

    clearInterval(loopLeft);
    clearInterval(loopRight);

    dropElem = document.getElementById("dropper");

    position = dropElem.getBoundingClientRect();
    bodyPos = document.body.getBoundingClientRect();
    containerPos = container.getBoundingClientRect();

    widthOffset = position.width / 2;
    heightOffset = position.height / 2;

    x = position.left + widthOffset;
    y = position.top + heightOffset;

    // ('rotateAnimationRight(\'' + el + '\',' + speed + ')', speed);
    loopRight = setTimeout(
        "rotateAnimationRight('" + el + "'," + speed + ")",
        speed
    );
    degrees++;
}

function rotateAnimationLeft(el, speed) {
    // elem = document.getElementById(el);
    // elem.style.transform = "rotate(" + degrees + "deg)";
    // clearInterval(loopRight);
    // clearInterval(loopLeft);

    elem = document.getElementById(el);
    elem.style.transform = "rotate(" + degrees + "deg)";

    clearInterval(loopRight);
    clearInterval(loopLeft);

    dropElem = document.getElementById("dropper");

    position = dropElem.getBoundingClientRect();
    bodyPos = document.body.getBoundingClientRect();
    containerPos = container.getBoundingClientRect();

    widthOffset = position.width / 2;
    heightOffset = position.height / 2;

    x = position.left + widthOffset;
    y = position.top + heightOffset;

    loopLeft = setTimeout(
        "rotateAnimationLeft('" + el + "'," + speed + ")",
        speed
    );
    degrees--;
}

bodyWidth = document.body.getBoundingClientRect().width;

bodyRectLeft = document.body.getBoundingClientRect().left;

containerTest = container.getBoundingClientRect();
////////////////////////////////////////////////////////////////////////
body_X = document.body.getBoundingClientRect().left;
body_Y = document.body.getBoundingClientRect().top;

container_X = container.getBoundingClientRect().left;
container_Y = container.getBoundingClientRect().top;

containerOffset_LEFT = container.offsetLeft;

////////////////////////////////////////////////////////////////////////

myResizeFunc = function () {
    let newBodyWidth = document.body.getBoundingClientRect().width;

    newContainerTestWidth = container.getBoundingClientRect().width;

    let droppedBombs = document.getElementsByClassName("bomb");
    for (let i = 0; i < droppedBombs.length - 1; i++) {
        moveBomb = document.getElementById(`bomb-${i}`);

        new_containerOffset_LEFT = container.offsetLeft;

        let bomb_X = moveBomb.getBoundingClientRect().left;
        let bomb_Y = moveBomb.getBoundingClientRect().top;

        ////////////////////////////////////////////////////////////////////////
        new_body_X = document.body.getBoundingClientRect().left;
        new_body_Y = document.body.getBoundingClientRect().top;

        // new_container_X = container.getBoundingClientRect().left;
        new_container_X = new_containerOffset_LEFT;
        new_container_Y = container.getBoundingClientRect().top;

        ////////////////////////////////////////////////////////////////////////
        // percentBigger_X = container_X / bomb_X;
        percentBigger_X = containerOffset_LEFT / bomb_X;

        percentBigger_Y = container_Y / bomb_Y;

        ////////////////////////////////////////////////////////////////////////
        // offset_X = bomb_X - container_X;
        offset_X = bomb_X - containerOffset_LEFT;

        offset_Y = bomb_X - container_Y;

        ////////////////////////////////////////////////////////////////////////
        newPos_X = new_containerOffset_LEFT / percentBigger_X;
        // newPos_X = new_container_X / percentBigger_X;

        newPos_Y = new_container_Y / percentBigger_Y;

        ////////////////////////////////////////////////////////////////////////
        moveBomb.style.left = newPos_X + "px";
        moveBomb.style.top = newPos_Y + "px";
        ////////////////////////////////////////////////////////////////////////
    }
};

btnClick = function () {
    bodyWidth = document.body.getBoundingClientRect().width;

    containerWidth = container.getBoundingClientRect().width;

    bodyHeight = document.body.getBoundingClientRect().height;

    containerHeight = container.getBoundingClientRect().height;

    bodyRectLeft = document.body.getBoundingClientRect().left;

    containerRectLeft = container.getBoundingClientRect().left;
};

findOffsetLeft = function (bodyWidth, bombWidth, newbodyWidth, bodyRectLeft) {
    let emptyWidth = bodyWidth - bombWidth;

    let percentTotal_Empty = emptyWidth / bodyWidth;

    let percentEach_Empty = percentTotal_Empty / 2;

    let newEmptySpaceWidth = percentEach_Empty * newbodyWidth;

    let newBombRectLeft = newEmptySpaceWidth + bodyRectLeft;

    return newBombRectLeft;
};

// window.addEventListener("resize", myResizeFunc);
const addCirclesBtn = document.getElementById("add-circles");
const mainCircle = document.getElementById("main-circle");
const infoBar = document.getElementById("info-bar");
const infoBarOpponent = document.getElementById("info-bar-opponent");
const slideDeck = document.querySelector(".slide-deck");

addCirclesBtn.addEventListener("click", startGameFunc);
let zoneInterval;

function startGameFunc() {
    // addCirclesBtn.addEventListener("click", () => {
    itemBoxCoords = addCircleFunc(60, 535);

    // ==============================================

    // addCirclesBtn.style.display = "none";
    addCirclesBtn.removeEventListener("click", startGameFunc);
    addCirclesBtn.innerText = "";

    // ==============================================

    let value = { key: "ArrowRight", target: { id: "nav-right" } };
    console.log(value);
    naviCtrl(value);

    infoBar.style.display = "block";
    infoBarOpponent.style.display = "block";

    displayStats("toUser", user);
    displayStats("toOpponent", user);

    socket.emit("randomDrop", {
        itemBoxCoords: itemBoxCoords,
        dropCount: dropCount,
    });

    // TODO: testing event loop:
    zoneInterval = setInterval(() => {
        let zone = zoneChecker("dropper", itemBoxCoords);

        // console.log("zone");
        // console.log(zone);

        if (zone.active) {
            ///////////////////////////////////////////////////////////
            socket.emit("explosion", {
                bombID: zone.bombID,
                bombLoc: zone.bombLoc,
                status: "detonate",
            });
        }

        if (zone.drop) {
            socket.emit("grabDrop", {
                dropID: zone.dropID,
                dropLoc: zone.dropLoc,
                status: "upgrade",
            });
        }
    }, 250);
    ////////////////////////////////////////////////////////////////////
    // TODO: place on server:
    ////////////////////////////////////////////////////////////////////
    // share drop array ID with server random drop function:
    ////////////////////////////////////////////////////////////////////
    // });
}

let fragment;

function addCircleFunc(numCircle, bigCircleSize) {
    let smallCircleSize = Math.round((bigCircleSize * Math.PI) / numCircle);
    let rotation = 0;
    const dropBoxArr = [];
    // let dropBoxIDArr = [];
    for (let i = 0; i < numCircle; i++) {
        let dropBoxID = `drop-box-${i}`;
        let newCircle = document.createElement("div");
        newCircle.id = dropBoxID;
        newCircle.classList.add("clock-parts", "item-box", "empty");
        // newCircle.style.border = "thin dotted red";
        // newCircle.style.backgroundColor = "purple";

        mainCircle.append(newCircle);
        let newDropBox = document.getElementById(dropBoxID);
        newDropBox.style.position = "absolute";
        newDropBox.style.height = `${smallCircleSize}px`;
        newDropBox.style.width = `${smallCircleSize}px`;

        dropBoxArr.push(newDropBox);
        // dropBoxIDArr.push(dropBoxID);

        let angle = 360 / numCircle;

        let theta = (angle / 180) * i * Math.PI;

        let posx = Math.round((bigCircleSize / 2) * Math.cos(theta)) + "px";
        let posy = Math.round((bigCircleSize / 2) * Math.sin(theta)) + "px";

        let bigCircleHeight = parseInt(
            window.getComputedStyle(mainCircle).height.slice(0, -2)
        );

        newDropBox.style.top =
            bigCircleHeight / 2 - parseInt(posy.slice(0, -2)) + "px";
        newDropBox.style.left =
            bigCircleHeight / 2 + parseInt(posx.slice(0, -2)) + "px";

        // rotation = rotation + angle;

        // newDropBox.style.transform = `rotate(${rotation * 1}deg)`;
        // newDropBox.style.transform = `translate(${bigCircleSize / 2}px)`;
        // newDropBox.style.transform = `rotate(${rotation * -1}deg)`;

        let smallMargin = -(smallCircleSize / 2);

        newDropBox.style.margin = `${smallMargin}px`;
    }

    // TODO: getItemBoxCoords(dropBoxArr);
    return getItemBoxCoords();
}

function explode(status, bombID, bombLoc) {
    let bombBox = document.getElementById(bombLoc);

    if (status === "detonate") {
        if (!bombBox.classList.contains("kaboom")) {
            bombBox.classList.add("kaboom");
            setTimeout(function () {
                // bombBox.removeChild(bombBox.childNodes[0]);
                // bombBox.classList.add(bombClass);
                let elem = bombBox.getElementsByClassName("bomb")[0];
                bombBox.removeChild(elem);
                bombBox.classList.remove("kaboom");
                bombBox.classList.remove("invisible");
                bombBox.classList.add("empty");
                updateStats(user, "damage");
            }, 500);
        }
    } else if (status === "remove") {
        let elem = bombBox.getElementsByClassName("bomb")[0];
        if (typeof elem !== "object") {
        } else {
            // checker to add bombs back if !"invisible":
            if (bombBox.classList.contains("glow")) {
                bombDropCount--;
                // TODO: add to database object and call changes in function: bombCount--;
            }
            bombBox.removeChild(elem);
            bombBox.classList.remove("glow");

            bombBox.classList.remove("invisible");

            bombBox.classList.remove("boom-box");
            bombBox.classList.add("empty");
        }
        // } else if (status === "remove and rearm") {
        //     let elem = bombBox.getElementsByClassName("bomb")[0];
        //     if (typeof elem !== "object") {
        //     } else {
        //         // TODO: add to database object and call changes in function: bombCount--;
        //         bombDropCount--;

        //         bombBox.removeChild(elem);
        //         bombBox.classList.remove("glow");

        //         bombBox.classList.remove("invisible");

        //         bombBox.classList.remove("boom-box");
        //         bombBox.classList.add("empty");
        //     }
    } else if (status === "reveal and remove") {
        let elem = bombBox.getElementsByClassName("bomb")[0];
        if (typeof elem !== "object") {
        } else {
            // TODO: use instead of "kaboom":
            bombBox.classList.add("reveal-enemy");
            // bombBox.classList.add("kaboom");

            setTimeout(function () {
                if (bombDropCount > 0) bombDropCount--;

                bombBox.removeChild(elem);
                bombBox.classList.remove("glow");
                // TODO: use instead of "kaboom":
                bombBox.classList.remove("reveal-enemy");
                // bombBox.classList.remove("kaboom");

                bombBox.classList.remove("invisible");

                bombBox.classList.remove("boom-box");
                bombBox.classList.add("empty");
            }, 500);
        }
    } else if (status === "upgrade") {
        let elem = bombBox.getElementsByClassName("rand-drop")[0];
        bombBox.removeChild(elem);
        bombBox.classList.remove("heart-wrapper");
        bombBox.classList.remove("heart");
        bombBox.classList.remove("heart-pulse");
        bombBox.classList.remove("ghost");
        bombBox.classList.remove("ghost-pulse");
        bombBox.classList.remove("glove");
        bombBox.classList.remove("glove-pulse");
        bombBox.classList.remove("random-drop");

        updateStats(user, "heal");
    } else if (status === "missed") {
        let elem = bombBox.getElementsByClassName("rand-drop")[0];
        if (typeof elem !== "object") {
        } else {
            dropCount--;
            console.log(dropCount);

            bombBox.removeChild(elem);
            bombBox.classList.remove("heart-wrapper");
            bombBox.classList.remove("heart");
            bombBox.classList.remove("heart-pulse");
            bombBox.classList.remove("ghost");
            bombBox.classList.remove("ghost-pulse");
            bombBox.classList.remove("glove");
            bombBox.classList.remove("glove-pulse");
            bombBox.classList.remove("random-drop");

            // if (dropCount <= 1) {
            socket.emit("randomDrop", {
                itemBoxCoords: itemBoxCoords,
                dropCount: dropCount,
                deployed: false,
                missed: true,
            });
            // };
        }
    } else if (status === "lost") {
        let elem = bombBox.getElementsByClassName("rand-drop")[0];
        if (typeof elem !== "object") {
        } else {
            // dropCount--;
            // console.log(dropCount);

            bombBox.removeChild(elem);
            bombBox.classList.remove("heart-wrapper");
            bombBox.classList.remove("heart");
            bombBox.classList.remove("heart-pulse");
            bombBox.classList.remove("ghost");
            bombBox.classList.remove("ghost-pulse");
            bombBox.classList.remove("glove");
            bombBox.classList.remove("glove-pulse");
            bombBox.classList.remove("random-drop");

            socket.emit("randomDrop", {
                itemBoxCoords: itemBoxCoords,
                dropCount: dropCount,
                deployed: false,
                missed: false,
            });
        }
    } else {
        alert(`issue found, status: ${status}`);
    }
}

function getItemBoxCoords() {
    let itemBoxArray = document.querySelectorAll(".item-box");

    for (let i = 0; i < itemBoxArray.length; i++) {
        let dropArrItem = {
            id: itemBoxArray[i].id,
            coords: itemBoxArray[i].getBoundingClientRect(),
        };
        itemBoxCoords.push(dropArrItem);
    }
    return itemBoxCoords;
}

function checkBoxStatus(itemBoxID, hasClass) {
    let boxToCheck = document.getElementById(itemBoxID);
    if (boxToCheck.classList.contains(hasClass)) {
        return true;
    } else {
        return false;
    }
}

function updatePlayerLocation() {
    let dropper = document.getElementById(dropperID);
}

function zoneChecker(dropperID, itemBoxCoords) {
    // TODO: export this function:
    let dropper = document.getElementById(dropperID);
    let dropperRect = dropper.getBoundingClientRect();

    for (let i = 0; i < itemBoxCoords.length; i++) {
        let dropArrItem = itemBoxCoords[i];
        let boxToCheck = document.getElementById(dropArrItem.id);

        // collision detection:
        if (
            parseInt(dropArrItem.coords.left) < Math.round(dropperRect.right) &&
            parseInt(dropArrItem.coords.right) > Math.round(dropperRect.left) &&
            parseInt(dropArrItem.coords.top) < Math.round(dropperRect.bottom) &&
            parseInt(dropArrItem.coords.bottom) > Math.round(dropperRect.top)
        ) {
            if (boxToCheck.classList.contains("invisible")) {
                return {
                    active: true,
                    bombID: "",
                    bombLoc: boxToCheck.id,
                    drop: false,
                };
            } else if (boxToCheck.classList.contains("random-drop")) {
                return {
                    active: false,
                    dropID: "",
                    dropLoc: boxToCheck.id,
                    drop: true,
                };
            } else {
                return {
                    active: false,
                    bombID: "",
                    bombLoc: "",
                    drop: false,
                };
            }

            // save location to respective spot on clock-map (for socket):
        }
    }
}

function displayStats(string, user) {
    let healthStat = document.getElementById("health-status");
    let healthStatOpponent = document.getElementById("health-status-opponent");
    let flashDiv = document.querySelector(".stats-opponent");

    if (string === "toUser") {
        healthStat.innerText = user.health;
    } else if (string === "toOpponent") {
        healthStatOpponent.innerText = user.health;
        // flashDiv.classList.add("pulse-score");
    } else {
    }
}

function updateStats(user, action) {
    if (action === "damage") {
        user.health = user.health - 10;
    } else if (action === "heal") {
        if (user.health < 100) {
            user.health = user.health + 5;
        }
    } else {
    }

    // TODO: create funtion updateBombCount();

    displayStats("toUser", user);

    socket.emit("displayStats", {
        user: user,
    });

    if (user.health <= 0 || opponent.health <= 0) {
        // TODO: emit socket message:
        // TODO: create modal and offer another game:
        // alert("GAME OVER!");
        socket.emit("game over");
    }
}

socket.on("game over", () => {
    gameOverModal();
});

// Modal placeholder:

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function gameOverModal() {
    clearInterval(zoneInterval);
    document.removeEventListener("touchstart", naviCtrl, false);

    document.removeEventListener("keydown", naviCtrl, false);

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
