module.exports = resizeFunc = function (bodyWidth, containerWidth, newbodyWidth, bodyRectLeft) {
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




container.style.left = 100 + "px";
document.querySelector(".bomb");

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

container = document.getElementById("container");
btn = document.getElementById("btn");
btn.addEventListener("click", btnClick);
window.addEventListener("resize", resizeFunc);

bodyRectLeft = 0;
containerRectLeft = 0;
bodyWidth = 0;
bodyHeight = 0;
containerWidth = 0;

bodyWidth = 0;
containerWidth = 0;

// findOffsetLeft = function (bodyWidth, containerWidth, newbodyWidth, bodyRectLeft) {

//     let emptyWidth = bodyWidth - containerWidth;
//     console.log("emptyWidth");
//     console.log(emptyWidth);

//     let percentTotal_Empty = emptyWidth / bodyWidth;
//     console.log("percentTotal_Empty");
//     console.log(percentTotal_Empty);

//     let percentEach_Empty = percentTotal_Empty / 2;
//     console.log("percentEach_Empty");
//     console.log(percentEach_Empty);

//     let newEmptySpaceWidth = percentEach_Empty * newbodyWidth;
//     console.log("newEmptySpaceWidth");
//     console.log(newEmptySpaceWidth);

//     let newContRectLeft = newEmptySpaceWidth + bodyRectLeft;
//     console.log("newContRectLeft");
//     console.log(newContRectLeft);

//     return newContRectLeft;
// };

// findOffsetHeight = function (bodyHeight, containerHeight, newbodyHeight) {

//     let containerPercent = containerHeight / bodyHeight;
//     console.log("containerPercent");
//     console.log(containerPercent);

//     let newContainerHeight = newbodyHeight * containerPercent;
//     console.log("newContainerHeight");
//     console.log(newContainerHeight);

//     return newContainerHeight;
// };

findOffsetWidth = function (bodyWidth, containerWidth, newbodyWidth) {

    let containerPercent = containerWidth / bodyWidth;
    console.log("containerPercent");
    console.log(containerPercent);

    let newContainerWidth = newbodyWidth * containerPercent;
    console.log("newContainerWidth");
    console.log(newContainerWidth);

    return newContainerWidth;
};
console.log("findOffsetWidth result:");