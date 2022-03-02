// ====================== rooms.js in routes/rooms.js ======================
const express = require("express");
const router = express.Router();
const Room = require("../models/room");
// ====================== room handle ======================
router.get("/:id", (req, res) => {
    console.log(req.params.id);
    res.render("room", { roomID: req.params.id });
});
// router.get("/register", (req, res) => {
//     res.render("register");
// });

// router.post("/", (req, res) => {
//     Room.findOne({ username: username }).exec((err, user) => {
//         console.log(user);
//         if (user) {
//             errors.push({ msg: "email already registered" });
//             res.render("register", {
//                 errors,
//                 roomName,
//                 email,
//                 username,
//                 password2,
//             });
//         } else {
//             const newRoom = new Room({
//                 roomName: roomName,
//                 username: username,
//                 password: password,
//             });

//             if (err) throw err;
//             // ====================== save new Room ======================
//             newRoom
//                 .save()
//                 .then((value) => {
//                     console.log(value);

//                     req.flash("success_msg", "You have create a new room!");

//                     res.redirect(`/rooms/${newRoom.id}`);
//                 })
//                 .catch((value) => console.log(value));
//         }
//     });
// });

// // ====================== Register handle ======================
// router.post("/login", (req, res, next) => {
//     passport.authenticate("local", {
//         successRedirect: "/splash",
//         failureRedirect: "/users/login",
//         failureFlash: true,
//     })(req, res, next);
// });
// // ====================== register post handle ======================
// router.post("/register", (req, res) => {
//     const { name, email, password, password2 } = req.body;
//     let errors = [];

//         // ====================== find users in room - waiting ======================

//     }
// });
// // ====================== leave room ======================
// router.get("/leave/:id", (req, res) => {
//     // req.logout();
//     // req.flash("success_msg", "Now logged out");
//     res.redirect("/rooms/lounge");
// });
module.exports = router;
