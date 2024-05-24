const express = require("express");
const router = express.Router();

const {
  getUserInfo,
  changePassword,
  addUserInfo,
  getDoctorInfo,
  updateDoctorInfo,
} = require("../controllers/profileController");

router.get("/:id", getUserInfo);
router.put("/:id", addUserInfo);
router.put("/change-password/:id", changePassword);
router.get("/doctor/:id", getDoctorInfo);
router.put("/doctor/:id", updateDoctorInfo);

module.exports = router;
