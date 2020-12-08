    var hazRunner = document.getElementById("clock-runner");
    var dropDiv = document.getElementById("dropper");
    var container = document.querySelector(".container");
    // var container = document.getElementById("game-screen");
    var btn = document.getElementById("btn");
    var loopRight;
    var loopLeft;
    var degrees = 0;
    var dropCount = 0;
    var x;
    var y;

    // global test vars:
    bodyRectLeft = 0;
    containerRectLeft = 0;
    bodyWidth = 0;
    bodyHeight = 0;
    containerWidth = 0;
    bombWidth = 0;

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

    document.addEventListener("keydown", function (value) {
        if (value.key === "ArrowUp") {

            clockDrop = document.getElementById("clock");
            bomb = this.createElement("DIV");
            bomb.classList.add("bomb");
            bomb.setAttribute("id", `bomb-${dropCount}`);

            console.log("bodyPos");
            console.log(bodyPos);
            console.log("bodyPos.width");
            console.log(bodyPos.width);
            console.log("bodyPos.height");
            console.log(bodyPos.height);

            container.append(bomb);

            newBomb = document.getElementById(`bomb-${dropCount}`);

            newBomb.style.left = (x) + "px";
            newBomb.style.top = (y) + "px";

            newBomb.classList.add("glow");
            bombWidth = newBomb.getBoundingClientRect().width;
            dropCount++;

        } else if (value.key === "ArrowDown") {
            dropDiv.style.backgroundImage = "url('')";
            hazRunner.style.background = "url('../../../public/assets/images/hazmat-runner-frontside.png')";
            hazRunner.classList.remove("move-left");
            hazRunner.classList.remove("move-right");
            hazRunner.classList.remove("move-forward");
            hazRunner.classList.remove("move-backward");
            hazRunner.classList.add("move-backward");

        } else if (value.key === "ArrowRight") {
            dropDiv.style.backgroundImage = "url('')";
            hazRunner.style.background = "url('../assets/images/clock-runner-xs-R.png')";
            hazRunner.classList.remove("move-left");
            hazRunner.classList.remove("move-right");
            hazRunner.classList.remove("move-forward");
            hazRunner.classList.remove("move-backward");
            hazRunner.classList.add("move-right");
            rotateAnimationRight("clock-runner", 50);

        } else if (value.key === "ArrowLeft") {
            dropDiv.style.backgroundImage = "url('')";
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
    });

    document.addEventListener("click", function (e) {
        xPos = e.clientX;
        yPos = e.clientY;

        clockDrop = document.getElementById("clock");
        bomb = this.createElement("DIV");
        bomb.classList.add("bomb");
        container.append(bomb);

        bomb.style.left = xPos + "px";
        bomb.style.top = yPos + "px";
    });

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

        ('rotateAnimationRight(\'' + el + '\',' + speed + ')', speed);
        loopRight = setTimeout('rotateAnimationRight(\'' + el + '\',' + speed + ')', speed);
        degrees++;
    };

    function rotateAnimationLeft(el, speed) {

        elem = document.getElementById(el);
        elem.style.transform = "rotate(" + degrees + "deg)";
        clearInterval(loopRight);
        clearInterval(loopLeft);

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

    addCirclesBtn.addEventListener("click", () => {
        addCircleFunc(60, 535);
        addCirclesBtn.style.display = "none"
    });

    const dropBoxArr = [];
    let fragment;

    function addCircleFunc(numCircle, bigCircleSize) {
        let smallCircleSize = Math.round(bigCircleSize * Math.PI / numCircle);
        let rotation = 0;
        for (let i = 0; i < numCircle; i++) {
            let dropBoxID = `drop-box-${i}`;
            let newCircle = document.createElement("div");
            newCircle.id = dropBoxID;
            newCircle.classList.add("clock-parts");
            newCircle.style.backgroundColor = "purple";

            mainCircle.append(newCircle);
            let newDropBox = document.getElementById(dropBoxID);
            newDropBox.style.position = "absolute";
            newDropBox.style.height = `${smallCircleSize}px`;
            newDropBox.style.width = `${smallCircleSize}px`;
            // console.log(newDropBox.style.height);
            
            dropBoxArr.push(newDropBox);

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

            // console.log(rotation);

        };
        console.log(dropBoxArr);
        // socket.emit("addCircle", {
        //     circleList: dropBoxArr
        // });
    };