const express = require("express");
const router = express.Router();

const {
  getUserInfo,
  changePassword,
  addUserInfo,
  getDoctorInfo,
  updateDoctorInfo,
  getStaffInfo,
  updateStaffInfo,
  getListUsers,
  getListDoctors,
  getListStaff,
} = require("../controllers/profileController");

router.get("/", getListUsers);
router.get("/doctor", getListDoctors);
router.get("/staff", getListStaff);
router.get("/:id", getUserInfo);
router.put("/:id", addUserInfo);
router.put("/change-password/:id", changePassword);
router.get("/doctor/:id", getDoctorInfo);
router.put("/doctor/:id", updateDoctorInfo);
router.get("/staff/:id", getStaffInfo);
router.put("/staff/:id", updateStaffInfo);

module.exports = router;
