const mongoose = require("mongoose");
// RoomId: mongo id
const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    users: {
        type: Array,
    },
    active: {
        type: Boolean,
        default: false,
    },
    open: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
