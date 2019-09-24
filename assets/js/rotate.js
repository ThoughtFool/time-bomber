    hazRunner = document.getElementById("clock-runner");

    rotateElem = function (el, speed) {
        var elem = document.getElementById(el);
        elem.style.transform = "rotate(" + degrees + "deg)";
        looper = setTimeout("rotateElem(\"" + el + "\"," + speed + ")", speed);
        degrees++;

        if (degrees > 359) {
            degress = 1;
        };
        document.getElementById("status").innerHTML = "rotate(" + "deg)";

    };
    // document.getElementById("clock-runner").addEventListener("click", rotateElem);
    // document.getElementById("clock-runner").addEventListener("click", myFunction);


    function myFunction() {
        document.getElementById("info").innerHTML = "YOU CLICKED ME!";
        // document.getElementById("status").innerHTML = "rotate(" + "deg)";
    };

    var rotated = false;

    // document.getElementById('btn-01').onclick = function () {

    //     // var div = document.getElementById('clock-runner'),
    //         deg = rotated ? 0 : 66;

    //     div.style.webkitTransform = 'rotate(' + deg + 'deg)';
    //     div.style.mozTransform = 'rotate(' + deg + 'deg)';
    //     div.style.msTransform = 'rotate(' + deg + 'deg)';
    //     div.style.oTransform = 'rotate(' + deg + 'deg)';
    //     div.style.transform = 'rotate(' + deg + 'deg)';

    //     rotated = !rotated;
    // };


    // runner functions (sprite sheet)

    // hazRunner = document.getElementById("runner");
    // hazRoad = document.getElementById("road");

    var parentPos;
    var childPos;
    var localLeft;
    var localTop;


    document.addEventListener("keydown", function (value) {
        console.log(value.key);
        if (value.key === "ArrowUp") {
            console.log("drop time bomb here:");
            console.log(degrees);
            clockDrop = document.getElementById("clock");
            bomb = this.createElement("DIV");
            bomb.classList.add("bomb");
            bomb.setAttribute("id", `bomb-${dropCount}`);
            document.body.append(bomb);
            
            newBomb = document.getElementById(`bomb-${dropCount}`);
            console.log(newBomb);
            dropCount++;

            parentPos = document.getElementById('clock').getBoundingClientRect();
            childPos = newBomb.getBoundingClientRect();

                bodyRect = document.body.getBoundingClientRect();
                offsetLeft = parentPos.left - bodyRect.left;
                offsetTop = parentPos.top - bodyRect.top;

                xLeft = offsetLeft - bodyRect.left;
                console.log("xLeft");
                console.log(xLeft);
                yTop = offsetTop - bodyRect.top;
                console.log("yTop");
                console.log(yTop);

                console.log("offsetLeft");
                console.log(offsetLeft);

                console.log("offsetTop");
                console.log(offsetTop);

                newBomb.style.left = (x) + "px";
                newBomb.style.top = (y) + "px";

        } else if (value.key === "ArrowDown") {
            hazRunner.style.background = "url('../../../public/assets/images/hazmat-runner-frontside.png')";
            hazRunner.classList.remove("move-left");
            hazRunner.classList.remove("move-right");
            hazRunner.classList.remove("move-forward");
            hazRunner.classList.remove("move-backward");
            hazRunner.classList.add("move-backward");

        } else if (value.key === "ArrowRight") {
            hazRunner.style.background = "url('../assets/images/clock-runner-xs-R.png')";
            hazRunner.classList.remove("move-left");
            hazRunner.classList.remove("move-right");
            hazRunner.classList.remove("move-forward");
            hazRunner.classList.remove("move-backward");
            hazRunner.classList.add("move-right");
            rotateAnimationRight("clock-runner", 50);

        } else if (value.key === "ArrowLeft") {
            hazRunner.style.background = "url('../assets/images/clock-runner-xs-L.png')";
            hazRunner.classList.remove("move-left");
            hazRunner.classList.add("move-left");
            hazRunner.classList.remove("move-right");
            hazRunner.classList.remove("move-forward");
            hazRunner.classList.remove("move-backward");
            rotateAnimationLeft("clock-runner", 50);
        } else if (value.key === "i" || value.key === "I") {
            console.log("Space key selected!");
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

        console.log("Space key selected!");
        clockDrop = document.getElementById("clock");
        bomb = this.createElement("DIV");
        bomb.classList.add("bomb");
        document.body.append(bomb);

        bomb.style.left = xPos + "px";
        bomb.style.top = yPos + "px";

        console.log("xPos");
        console.log(xPos);
        console.log("yPos");
        console.log(yPos);
    });

    var loopRight;
    var loopLeft;
    var degrees = 0;
    var elem;
    var dropCount = 0;
    var x;
    var y;
    var xx;
    var yy;
    dropElem = document.getElementById("dropper");

    function rotateAnimationRight(el, speed) {

        elem = document.getElementById(el);
        elem.style.transform = "rotate(" + degrees + "deg)";
        clearInterval(loopLeft);
        clearInterval(loopRight);

        dropElem = document.getElementById("dropper");

        position = dropElem.getBoundingClientRect();
        bodyPos = document.body.getBoundingClientRect();

        console.log("dropElem");
        console.log(dropElem);

        widthOffset = (position.width / 2);
        heightOffset = (position.height / 2);

        x = (position.left + widthOffset);
        y = (position.top + heightOffset);
        console.log("position");
        console.log(position);

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
    // dx = p2.x - p1.x;
    // dy = p2.y - p1.y;

    // Math.atan2(dx, dy) * 180 / Math.PI;
