const users = [];

// Join user to chat:
function userJoin(id, username, room) {
    const user = { id, username, room };

    users.push(user);

    return user;
}

// Get current user/client:
function getCurrentUser(id) {
    return users.find((user) => user.id === id);
}

// User/Client leaves chat:
function userLeaves(id) {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// Get room users:
function getRoomUsers(roomId) {
    return users.filter((user) => user.room === roomId);
}

module.exports = {
    userJoin: userJoin,
    getCurrentUser: getCurrentUser,
    userLeaves: userLeaves,
    getRoomUsers: getRoomUsers,
};
