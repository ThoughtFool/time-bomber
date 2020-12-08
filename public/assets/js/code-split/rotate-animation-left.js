function rotateAnimationLeft(el, speed) {

    elem = document.getElementById(el);
    elem.style.transform = "rotate(" + degrees + "deg)";
    clearInterval(loopLeft);
    clearInterval(loopRight);

    loopLeft = setTimeout('rotateAnimationLeft(\'' + el + '\',' + speed + ')', speed);
    degrees--;
};