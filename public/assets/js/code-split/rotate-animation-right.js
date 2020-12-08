
globalObj = require("./global-obj");
degrees = require("./global-obj").degrees;
var el;
// rotateAnimationRight = require("./rotate-animation-right");
setTimeoutFunc = require("./time-out");
module.exports = rotateAnimationRight = function (el, speed, degrees) {
    
    container = document.getElementById("game-screen");
    console.log("el");
    console.log(el);

    elem = document.getElementById(el);
    elem.style.transform = "rotate(" + degrees + "deg)";
    if (typeof loopLeft !== 'undefined') {
        clearInterval(loopLeft);
    };
    
    if (typeof loopRight !== 'undefined') {
        clearInterval(loopRight);
    };

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

    // (rotateAnimationRight(el, speed), speed);
