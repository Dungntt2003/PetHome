const express = require("express");
const router = express.Router();
const {
  registerNewUser,
  checkUserLogin,
  checkDoctorLogin,
} = require("../controllers/loginController");

router.post("/register", registerNewUser);
router.post("/login", checkUserLogin);
router.post("/login/doctor", checkDoctorLogin);

module.exports = router;
