const express = require("express");
const router = express.Router();
const {
  registerNewUser,
  checkUserLogin,
} = require("../controllers/loginController");

router.post("/register", registerNewUser);
router.post("/login", checkUserLogin);

module.exports = router;
