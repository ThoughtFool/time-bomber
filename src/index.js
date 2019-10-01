console.log("Hello, World!");
rotate = require("../assets/js/rotate");
resizeFunc = require("../assets/js/resize-func");
moveSprite = require("../assets/js/key-up-func");
globalVar = require("../assets/js/global-var");
// globalVar();

// // global variables:
// loopRight;
// loopLeft;
degrees = 0;
dropCount = 0;
// var x;
// var y;
// var hazRunner = document.getElementById("clock-runner");
// var dropDiv = document.getElementById("dropper");
// var container = document.querySelector(".container");



document.addEventListener("keydown", moveSprite);

document.getElementsByTagName("BODY")[0].onresize = function () {
    resizeFunc();
};