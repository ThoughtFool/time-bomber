module.exports = findOffsetLeft = function (bodyWidth, containerWidth, newbodyWidth, bodyRectLeft) {

    let emptyWidth = bodyWidth - containerWidth;
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

    let newContRectLeft = newEmptySpaceWidth + bodyRectLeft;
    console.log("newContRectLeft");
    console.log(newContRectLeft);

    return newContRectLeft;
};