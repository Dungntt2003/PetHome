const express = require("express");
const router = express.Router();
const {
  registerNewUser,
  checkUserLogin,
  getUser,
  checkDoctorLogin,
} = require("../controllers/loginController");

router.post("/register", registerNewUser);
router.post("/login", checkUserLogin);
router.get("/users", getUser)
router.post("/login/doctor", checkDoctorLogin);

module.exports = router;
