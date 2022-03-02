const { joinWaitList, activeRoomsObject } = require(".");

console.log(activeRoomsObject);

// method to get roomCount:
console.log(activeRoomsObject.getRoomCount("lounge"));

// "Whiskers" will remain in lounge until someone else is added to waitList:
joinWaitList("Whiskers");

console.log("=====================");

console.log(activeRoomsObject);

// method to get roomCount:
console.log(activeRoomsObject.getRoomCount("lounge"));

console.log("=====================");

// As soon as "Skittles" is added to waitList, both "Whiskers" and "Skittles will be removed from lounge and placed in newly created room:
joinWaitList("Skittles");

console.log(activeRoomsObject);

// method to get roomCount:
console.log(activeRoomsObject.getRoomCount("lounge"));
