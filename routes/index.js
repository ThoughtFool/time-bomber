const express = require("express");
const router = express.Router();

const { ensureAuthenticated } = require("../config/auth.js");

// ====================== login page ======================
router.get("/", (req, res) => {
    res.render("welcome");
});
// ====================== register page ======================
router.get("/register", (req, res) => {
    res.render("register");
});

// ====================== waiting-room page ======================
router.get("/game-lounge", ensureAuthenticated, (req, res) => {
    res.render("game-lounge", {
        user: req.user,
    });
});

// router.get("/dashboard", ensureAuthenticated, (req, res) => {
//     res.render("dashboard", {
//         user: req.user,
//     });
// });

// =====================================================================
// =====================================================================

router.get("/splash", ensureAuthenticated, (req, res) => {
    res.render("splash", {
        user: req.user,
    });
});

router.post("/game/:roomId", ensureAuthenticated, (req, res) => {
    console.log(req.params.roomId);
});

router.get("/game", ensureAuthenticated, (req, res) => {
    res.render("index", {
        user: req.user,
    });
});

module.exports = router;
