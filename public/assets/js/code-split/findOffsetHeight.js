module.exports = findOffsetHeight = function (bodyHeight, containerHeight, newbodyHeight) {

    let containerPercent = containerHeight / bodyHeight;
    console.log("containerPercent");
    console.log(containerPercent);

    let newContainerHeight = newbodyHeight * containerPercent;
    console.log("newContainerHeight");
    console.log(newContainerHeight);

    return newContainerHeight;
};