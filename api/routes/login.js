const express = require("express");
const router = express.Router();
const {
  registerNewUser,
  checkUserLogin,
  getUser,
} = require("../controllers/loginController");

router.post("/register", registerNewUser);
router.post("/login", checkUserLogin);
router.get("/users", getUser)

module.exports = router;
