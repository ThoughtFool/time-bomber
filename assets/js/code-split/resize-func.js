module.exports = resizeFunc = function () {
    var dropElem = document.getElementById("dropper");
    var position = dropElem.getBoundingClientRect();
    console.log(position.width);
    console.log(position.height);
    var droppedBombs = document.getElementsByClassName("bomb");
    for (let i = 0; i < droppedBombs.length; i++) {
        console.log(droppedBombs[i]);

        // respResize

        droppedBombs[i].style.left = 25 + "px";
        droppedBombs[i].style.top = 25 + "px";
    };
};

resizeFunc = function () {
    // responsive weight:
    let newbodyWidth = document.body.getBoundingClientRect().width;
    let newContainerWidth = findOffsetWidth(bodyWidth, containerWidth, newbodyWidth);
    console.log(newContainerWidth);
    container.style.width = newContainerWidth + "px";

    // responsive height:
    let newbodyHeight = document.body.getBoundingClientRect().height;
    let newContainerHeight = findOffsetHeight(bodyHeight, containerHeight, newbodyHeight);
    console.log(newContainerHeight);
    container.style.height = newContainerWidth + "px";

    // responsive left:
    let newContainerLeft = findOffsetLeft(bodyWidth, containerWidth, newbodyWidth, bodyRectLeft);
    console.log(newContainerLeft);
    container.style.left = newContainerLeft + "px";
};