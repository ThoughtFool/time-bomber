    let socket = io();
    var hazRunner = document.getElementById("clock-runner");
    // var dropDiv = document.getElementById("dropper");
    var container = document.querySelector(".container");
    // var container = document.getElementById("game-screen");
    var btn = document.getElementById("btn");
    var loopRight;
    var loopLeft;
    var degrees = 0;
    var dropCount = 0;
    var x;
    var y;

    let itemBoxCoords = [];

    let user = {
        health: 100,
        bombCount: 5
    };

    let opponent = {
        health: 100,
        bombCount: 5
    };

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
    //     console.log(snap);
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
    };

    function spawnDrop(boxDropID, dropClass, dropCount) {
        console.log("randomly-deployed item");

        let randDrop = document.createElement("DIV");
        randDrop.classList.add("rand-drop", dropClass);
        // drop.classList.add("randDrop", "glow");
        randDrop.setAttribute("id", `randDrop-${dropCount}`);

        let boxToDrop = document.getElementById(boxDropID);
        boxToDrop.append(randDrop);
        boxToDrop.classList.add(dropClass);
        boxToDrop.classList.add("random-drop");

        let second = 1000;
        setTimeout(() => {
            let elem = boxToDrop.getElementsByClassName("rand-drop")[0];
            if (elem != null) {
                boxToDrop.removeChild(elem);
                boxToDrop.classList.remove(dropClass);
                boxToDrop.classList.remove("heart");
                boxToDrop.classList.remove("ghost");
                boxToDrop.classList.remove("glove");
                boxToDrop.classList.remove("random-drop");
            }

            // removeElement(randDrop.id);
        }, 10 * second);
    };

    socket.on("addBombNow", (data) => {
        spawnBomb(data.dropCount, data.boxDropID, data.bombClass, data.activeBomb);
    });

    socket.on("explosion", (data) => {
        explode(data.status, data.bombID, data.bombLoc);
    });

    socket.on("grabDrop", (data) => {
        explode(data.status, data.dropID, data.dropLoc);

        // status:
        // "upgrade"
        // "missed"
    });

    socket.on("displayStats", (data) => {
        displayStats("toOpponent", data.user);
    });

    socket.on("randomDrop", (data) => {
        console.log("randomDropItem:");
        console.log("random drop data, returned from server");
        console.log(data);

        spawnDrop(data.randID, data.randItem, data.dropCount);

        setTimeout(async () => {
            await socket.emit("randomDrop", {
                itemBoxCoords: itemBoxCoords
            });
        }, 10000);
    });



    async function naviCtrl(value) {



        if (value.key === "ArrowDown" || value.target.id === "nav-down") {

            // clockDrop = document.getElementById("clock");
            // bomb = this.createElement("DIV");
            // bomb.classList.add("bomb");
            // bomb.setAttribute("id", `bomb-${dropCount}`);

            console.log("bodyPos");
            console.log(bodyPos);
            console.log("bodyPos.width");
            console.log(bodyPos.width);
            console.log("bodyPos.height");
            console.log(bodyPos.height);

            // container.append(bomb);
            //////////////////////////////////////////////////////
            // create cartesian coord function to check if (x, y) are inside of boxDrop array
            console.log("=================== itemBoxArray ===================");



            function coordChecker(dropperID) {
                let dropper = document.getElementById(dropperID);
                let dropperRect = dropper.getBoundingClientRect();
                let itemBoxArray = document.querySelectorAll(".item-box");
                // console.log(itemBoxArray);
                for (let i = 0; i < itemBoxArray.length; i++) {
                    let dropArrItem = itemBoxArray[i].getBoundingClientRect();
                    console.log("dropArrItem");
                    console.log(dropArrItem);

                    console.log("dropperRect");
                    console.log(dropperRect);

                    if (dropArrItem.left < dropperRect.right &&
                        dropArrItem.right > dropperRect.left &&
                        dropArrItem.top < dropperRect.bottom &&
                        dropArrItem.bottom > dropperRect.top) {
                        return itemBoxArray[i].id;
                    };
                };
            };

            //////////////////////////////////////////////////////
            console.log(coordChecker("dropper"));
            const boxToDrop = document.getElementById(await coordChecker("dropper"));

            if (boxToDrop.classList.contains("empty")) {
                socket.emit("addBombNow", {
                    dropCount: dropCount,
                    boxDropID: boxToDrop.id,
                    bombClass: "glow",
                    activeBomb: "inactive"
                    // boxToDrop.append(bomb);
                    // boxToDrop.classList.remove("empty");
                    // boxToDrop.classList.add("boom");

                });

                // TODO: when bomb timer runs out or explodes --> boxToDrop.classList.add("empty");
                //////////////////////////////////////////////////////
                // save location to respective spot on clock-map (for socket):
                // function mapDrop(dropLocID) {
                //     dropLocID
                // };

                // newBomb = document.getElementById(`bomb-${dropCount}`);

                // console.log(`x = ${x}`);

                // newBomb.style.left = (x) + "px";
                // newBomb.style.top = (y) + "px";

                // newBomb.classList.add("glow");
                // bombWidth = newBomb.getBoundingClientRect().width;
                dropCount++;
            };

        } else if (value.key === "ArrowUp" || value.target.id === "nav-up") {
            // dropDiv.style.backgroundImage = "url('')";
            hazRunner.style.background = "url('../../../public/assets/images/hazmat-runner-frontside.png')";
            hazRunner.classList.remove("move-left");
            hazRunner.classList.remove("move-right");
            hazRunner.classList.remove("move-forward");
            hazRunner.classList.remove("move-backward");
            hazRunner.classList.add("move-backward");

        } else if (value.key === "ArrowRight" || value.target.id === "nav-right") {
            // dropDiv.style.backgroundImage = "url('')";
            hazRunner.style.background = "url('../assets/images/clock-runner-xs-R.png')";
            hazRunner.classList.remove("move-left");
            hazRunner.classList.remove("move-right");
            hazRunner.classList.remove("move-forward");
            hazRunner.classList.remove("move-backward");
            hazRunner.classList.add("move-right");
            rotateAnimationRight("clock-runner", 50);

        } else if (value.key === "ArrowLeft" || value.target.id === "nav-left") {
            // dropDiv.style.backgroundImage = "url('')";
            hazRunner.style.background = "url('../assets/images/clock-runner-xs-L.png')";
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
            console.log("Space key selected!");
            clockDrop = document.getElementById("clock");
            bomb = this.createElement("DIV");
            bomb.classList.add("bomb");
            clockDrop.append(bomb);
        } else if (value.key === "k" || value.key === "K") {
            console.log("Space key selected!");
            clockDrop = document.getElementById("clock");
            bomb = this.createElement("DIV");
            bomb.classList.add("bomb");
            clockDrop.append(bomb);
        } else if (value.key === "l" || value.key === "L") {
            console.log("Space key selected!");
            clockDrop = document.getElementById("clock");
            bomb = this.createElement("DIV");
            bomb.classList.add("bomb");
            clockDrop.append(bomb);
        };
    };
    //     alert(value);
    //     console.log(value);
    // }

    // document.querySelector(".quarter1").ontouchstart = touchNav;
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

        widthOffset = (position.width / 2);
        heightOffset = (position.height / 2);

        x = (position.left + widthOffset);
        y = (position.top + heightOffset);

        // ('rotateAnimationRight(\'' + el + '\',' + speed + ')', speed);
        loopRight = setTimeout('rotateAnimationRight(\'' + el + '\',' + speed + ')', speed);
        degrees++;
    };

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

        widthOffset = (position.width / 2);
        heightOffset = (position.height / 2);

        x = (position.left + widthOffset);
        y = (position.top + heightOffset);

        loopLeft = setTimeout('rotateAnimationLeft(\'' + el + '\',' + speed + ')', speed);
        degrees--;
    };

    bodyWidth = document.body.getBoundingClientRect().width;
    console.log("bodyWidth");
    console.log(bodyWidth);
    bodyRectLeft = document.body.getBoundingClientRect().left;
    console.log("bodyRectLeft");
    console.log(bodyRectLeft);

    containerTest = container.getBoundingClientRect();
    ////////////////////////////////////////////////////////////////////////
    body_X = document.body.getBoundingClientRect().left;
    body_Y = document.body.getBoundingClientRect().top;

    container_X = container.getBoundingClientRect().left;
    container_Y = container.getBoundingClientRect().top;

    containerOffset_LEFT = container.offsetLeft;
    console.log("container.offsetLeft");
    console.log(container.offsetLeft);
    ////////////////////////////////////////////////////////////////////////

    myResizeFunc = function () {

        let newBodyWidth = document.body.getBoundingClientRect().width;
        console.log("newBodyWidth");
        console.log(newBodyWidth);

        newContainerTestWidth = container.getBoundingClientRect().width;

        let droppedBombs = document.getElementsByClassName("bomb");
        for (let i = 0; i < droppedBombs.length - 1; i++) {
            moveBomb = document.getElementById(`bomb-${i}`);
            console.log(droppedBombs[i]);
            console.log(moveBomb);

            console.log("moveBomb.offsetLeft");
            console.log(moveBomb.offsetLeft);

            new_containerOffset_LEFT = container.offsetLeft;
            console.log("new_containerOffset_LEFT");
            console.log(new_containerOffset_LEFT);

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
            console.log("percentBigger_X");
            console.log(percentBigger_X);

            percentBigger_Y = container_Y / bomb_Y;
            console.log("percentBigger_Y");
            console.log(percentBigger_Y);
            ////////////////////////////////////////////////////////////////////////
            // offset_X = bomb_X - container_X;
            offset_X = bomb_X - containerOffset_LEFT;
            console.log("offset_X");
            console.log(offset_X);

            offset_Y = bomb_X - container_Y;
            console.log("offset_Y");
            console.log(offset_Y);
            ////////////////////////////////////////////////////////////////////////
            newPos_X = new_containerOffset_LEFT / percentBigger_X;
            // newPos_X = new_container_X / percentBigger_X;
            console.log("newPos_X");
            console.log(newPos_X);
            newPos_Y = new_container_Y / percentBigger_Y;
            console.log("newPos_Y");
            console.log(newPos_Y);
            ////////////////////////////////////////////////////////////////////////
            moveBomb.style.left = (newPos_X) + "px";
            moveBomb.style.top = (newPos_Y) + "px";
            ////////////////////////////////////////////////////////////////////////
        };
    };

    btnClick = function () {
        bodyWidth = document.body.getBoundingClientRect().width;
        console.log("bodyWidth");
        console.log(bodyWidth);
        containerWidth = container.getBoundingClientRect().width;
        console.log("containerWidth");
        console.log(containerWidth);

        bodyHeight = document.body.getBoundingClientRect().height;
        console.log("bodyHeight");
        console.log(bodyHeight);
        containerHeight = container.getBoundingClientRect().height;
        console.log("containerHeight");
        console.log(containerHeight);

        bodyRectLeft = document.body.getBoundingClientRect().left;
        console.log("bodyRectLeft");
        console.log(bodyRectLeft);
        containerRectLeft = container.getBoundingClientRect().left;
        console.log("containerRectLeft");
        console.log(containerRectLeft);
    };

    findOffsetLeft = function (bodyWidth, bombWidth, newbodyWidth, bodyRectLeft) {

        let emptyWidth = bodyWidth - bombWidth;
        console.log("emptyWidth");
        console.log(emptyWidth);

        let percentTotal_Empty = emptyWidth / bodyWidth;
        console.log("percentTotal_Empty");
        console.log(percentTotal_Empty);

        let percentEach_Empty = percentTotal_Empty / 2;
        console.log("percentEach_Empty");
        console.log(percentEach_Empty);

        let newEmptySpaceWidth = percentEach_Empty * newbodyWidth;
        console.log("newEmptySpaceWidth");
        console.log(newEmptySpaceWidth);

        let newBombRectLeft = newEmptySpaceWidth + bodyRectLeft;
        console.log("newBombRectLeft");
        console.log(newBombRectLeft);

        return newBombRectLeft;
    };

    // window.addEventListener("resize", myResizeFunc);
    console.log("findOffsetWidth result:");

    const addCirclesBtn = document.getElementById("add-circles");
    const mainCircle = document.getElementById("main-circle");
    const infoBar = document.getElementById("info-bar");
    const infoBarOpponent = document.getElementById("info-bar-opponent");
    const slideDeck = document.querySelector(".slide-deck");

    addCirclesBtn.addEventListener("click", () => {
        itemBoxCoords = addCircleFunc(60, 535);
        console.log(itemBoxCoords);
        addCirclesBtn.style.display = "none";
        infoBar.style.display = "block";
        infoBarOpponent.style.display = "block"

        displayStats("toUser", user);
        displayStats("toOpponent", user);

        socket.emit("randomDrop", {
            itemBoxCoords: itemBoxCoords
        });

        // TODO: testing event loop:
        setInterval(() => {
            // console.log(zoneChecker("dropper", itemBoxCoords));
            let zone = zoneChecker("dropper", itemBoxCoords);
            console.log("zone");
            console.log(zone);
            if (zone.active) { ///////////////////////////////////////////////////////////
                socket.emit("explosion", {
                    bombID: zone.bombID,
                    bombLoc: zone.bombLoc,
                    status: "detonate"
                });
            };

            if (zone.drop) {
                socket.emit("grabDrop", {
                    dropID: zone.dropID,
                    dropLoc: zone.dropLoc,
                    status: "upgrade"
                });
            }
        }, 250);
        ////////////////////////////////////////////////////////////////////
        // TODO: place on server:
        ////////////////////////////////////////////////////////////////////
        // share drop array ID with server random drop function:
        ////////////////////////////////////////////////////////////////////
    });

    let fragment;

    function addCircleFunc(numCircle, bigCircleSize) {
        let smallCircleSize = Math.round(bigCircleSize * Math.PI / numCircle);
        let rotation = 0;
        const dropBoxArr = [];
        // let dropBoxIDArr = [];
        for (let i = 0; i < numCircle; i++) {
            let dropBoxID = `drop-box-${i}`;
            let newCircle = document.createElement("div");
            newCircle.id = dropBoxID;
            newCircle.classList.add("clock-parts", "item-box", "empty");
            newCircle.style.border = "thin dotted red";
            // newCircle.style.backgroundColor = "purple";

            mainCircle.append(newCircle);
            let newDropBox = document.getElementById(dropBoxID);
            newDropBox.style.position = "absolute";
            newDropBox.style.height = `${smallCircleSize}px`;
            newDropBox.style.width = `${smallCircleSize}px`;
            // console.log(newDropBox.style.height);

            dropBoxArr.push(newDropBox);
            // dropBoxIDArr.push(dropBoxID);

            let angle = 360 / numCircle;

            let theta = (angle / 180) * i * Math.PI;

            let posx = Math.round((bigCircleSize / 2) * (Math.cos(theta))) + 'px';
            let posy = Math.round((bigCircleSize / 2) * (Math.sin(theta))) + 'px';

            let bigCircleHeight = parseInt(window.getComputedStyle(mainCircle).height.slice(0, -2));

            newDropBox.style.top = ((bigCircleHeight / 2) - parseInt(posy.slice(0, -2))) + 'px';
            newDropBox.style.left = ((bigCircleHeight / 2) + parseInt(posx.slice(0, -2))) + 'px';

            // rotation = rotation + angle;

            // newDropBox.style.transform = `rotate(${rotation * 1}deg)`;
            // newDropBox.style.transform = `translate(${bigCircleSize / 2}px)`;
            // newDropBox.style.transform = `rotate(${rotation * -1}deg)`;

            let smallMargin = -(smallCircleSize / 2);

            newDropBox.style.margin = `${smallMargin}px`;

        };

        // TODO: getItemBoxCoords(dropBoxArr);
        return getItemBoxCoords();
    };

    function explode(status, bombID, bombLoc) {
        console.log("bombLoc");
        console.log(bombLoc);
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
            };

        } else if (status === "remove") {
            // console.log("bombBox.childNodes[0]");
            // console.log(bombBox.childNodes[0]);
            // bombBox.removeChild(bombBox.childNodes[0]);
            // bombBox.classList.add(bombClass);

            let elem = bombBox.getElementsByClassName("bomb")[0];
            if (typeof elem !== "object") {
                console.log("elem");
                console.log(typeof elem);

            } else {
                bombBox.removeChild(elem);
                bombBox.classList.remove("glow");
                bombBox.classList.remove("boom-box");
                bombBox.classList.add("empty");
            };

        } else if (status === "upgrade") {
            let elem = bombBox.getElementsByClassName("rand-drop")[0];
            bombBox.removeChild(elem);
            console.log(elem);
            bombBox.classList.remove("heart");
            bombBox.classList.remove("ghost");
            bombBox.classList.remove("glove");
            bombBox.classList.remove("random-drop");

            updateStats(user, "heal");

        } else if (status === "missed") {
            let elem = bombBox.getElementsByClassName("rand-drop")[0];
            bombBox.removeChild(elem);
            bombBox.classList.remove("heart");
            bombBox.classList.remove("ghost");
            bombBox.classList.remove("glove");
            bombBox.classList.remove("random-drop");

        } else {
            alert("issue found");
        };
    };

    function getItemBoxCoords() {
        let itemBoxArray = document.querySelectorAll(".item-box");
        console.log("itemBoxArray");
        console.log(itemBoxArray);

        for (let i = 0; i < itemBoxArray.length; i++) {
            let dropArrItem = {
                id: itemBoxArray[i].id,
                coords: itemBoxArray[i].getBoundingClientRect()
            }
            itemBoxCoords.push(dropArrItem);
        };
        return itemBoxCoords;
    };

    function checkBoxStatus(itemBoxID, hasClass) {
        let boxToCheck = document.getElementById(itemBoxID);
        if (boxToCheck.classList.contains(hasClass)) {
            console.log("boxToCheck!");
            console.log(boxToCheck);

            return true;
        } else {
            return false;
        };
    };

    function updatePlayerLocation() {
        let dropper = document.getElementById(dropperID);
    };

    function zoneChecker(dropperID, itemBoxCoords) {
        // TODO: export this function:
        let dropper = document.getElementById(dropperID);
        let dropperRect = dropper.getBoundingClientRect();

        for (let i = 0; i < itemBoxCoords.length; i++) {

            let dropArrItem = itemBoxCoords[i];
            let boxToCheck = document.getElementById(dropArrItem.id);


            // collision detection:
            if (parseInt(dropArrItem.coords.left) < Math.round(dropperRect.right) &&
                parseInt(dropArrItem.coords.right) > Math.round(dropperRect.left) &&
                parseInt(dropArrItem.coords.top) < Math.round(dropperRect.bottom) &&
                parseInt(dropArrItem.coords.bottom) > Math.round(dropperRect.top)) {

                if (boxToCheck.classList.contains("invisible")) {

                    return {
                        active: true,
                        bombID: "",
                        bombLoc: boxToCheck.id,
                        drop: false
                    };

                } else if (boxToCheck.classList.contains("random-drop")) {
                    return {
                        active: false,
                        dropID: "",
                        dropLoc: boxToCheck.id,
                        drop: true
                    };
                } else {
                    return {
                        active: false,
                        bombID: "",
                        bombLoc: "",
                        drop: false
                    };
                };

                // save location to respective spot on clock-map (for socket):

            };
        };
    };

    function displayStats(string, user) {
        let healthStat = document.getElementById("health-status");
        let healthStatOpponent = document.getElementById("health-status-opponent");

        if (string === "toUser") {
            healthStat.innerText = user.health;

        } else if (string === "toOpponent") {
            healthStatOpponent.innerText = user.health;

        } else {
            console.log("something went wrong");
        }

    };

    function updateStats(user, action) {

        if (action === "damage") {
            user.health = user.health - 10;

        } else if (action === "heal") {
            
            if (user.health < 100) {
                user.health = user.health + 5;
            };

        } else {
            console.log("no action selected");
        };

        // TODO: create funtion updateBombCount();

        displayStats("toUser", user);

        socket.emit("displayStats", {
            user: user
        });

        if (user.health <= 0 || opponent.health <= 0) {
            // TODO: emit socket message:
            alert("GAME OVER!");
        };
    };

    function removeDrop() {

        // function removeElement(id) {
        //     if (id != null) {
        //         var elem = document.getElementById(id);
        //         return elem.parentNode.removeChild(elem);
        //     } else {
        //         return;
        //     };
        // };
        // boxToDrop.classList.remove(dropClass);
        // boxToDrop.classList.remove("random-drop");

        // removeElement(randDrop.id);
    };