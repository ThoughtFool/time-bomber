module.exports = rotateElem = function (el, speed) {
    var elem = document.getElementById(el);
    elem.style.transform = "rotate(" + degrees + "deg)";
    looper = setTimeout("rotateElem(\"" + el + "\"," + speed + ")", speed);
    degrees++;

    if (degrees > 359) {
        degress = 1;
    };
    document.getElementById("status").innerHTML = "rotate(" + "deg)";

};