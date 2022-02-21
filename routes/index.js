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
// router.get("/waiting-room", (req, res) => {
//     res.render("waiting-room");
// });


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

router.get("/game", ensureAuthenticated, (req, res) => {
    res.render("index", {
        user: req.user
    });
});

module.exports = router;
