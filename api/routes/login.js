const express = require("express");
const router = express.Router();
const {
  registerNewUser,
  checkUserLogin,
  checkDoctorLogin,
  checkStaffLogin,
} = require("../controllers/loginController");

router.post("/register", registerNewUser);
router.post("/login", checkUserLogin);
router.post("/login/doctor", checkDoctorLogin);
router.post("/login/staff", checkStaffLogin);

module.exports = router;
