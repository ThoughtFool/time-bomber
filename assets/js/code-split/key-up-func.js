var rotateAnimationRight = require("../rotate-animation-right");
var rotateAnimationLeft = require("./rotate-animation-left");

module.exports = moveSprite = function (value) {
    var hazRunner = document.getElementById("clock-runner");
    var dropDiv = document.getElementById("dropper");
    var container = document.querySelector(".container");
    
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

        bomb.style.left = (x) + "px";
        bomb.style.top = (y) + "px";
        container.append(bomb);

        newBomb = document.getElementById(`bomb-${dropCount}`);
        newBomb.classList.add("glow");
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
        // clockDrop.append(bomb);
    } else if (value.key === "j" || value.key === "J") {
        console.log("Space key selected!");
        clockDrop = document.getElementById("clock");
        bomb = this.createElement("DIV");
        bomb.classList.add("bomb");
        // clockDrop.append(bomb);
    } else if (value.key === "k" || value.key === "K") {
        console.log("Space key selected!");
        clockDrop = document.getElementById("clock");
        bomb = this.createElement("DIV");
        bomb.classList.add("bomb");
        // clockDrop.append(bomb);
    } else if (value.key === "l" || value.key === "L") {
        console.log("Space key selected!");
        clockDrop = document.getElementById("clock");
        bomb = this.createElement("DIV");
        bomb.classList.add("bomb");
        // clockDrop.append(bomb);
    };
    };