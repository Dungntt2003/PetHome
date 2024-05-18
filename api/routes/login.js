const express = require("express");
const router = express.Router();
const {
  registerNewUser,
  checkUserLogin,
  getUser,
  checkDoctorLogin,
  updateUserById,
  deleteUserById,
} = require("../controllers/loginController");

router.post("/register", registerNewUser);
router.post("/login", checkUserLogin);
router.get("/users", getUser);
router.put("/users/:id", updateUserById);
router.delete("/users/:id", deleteUserById);
router.post("/login/doctor", checkDoctorLogin);

module.exports = router;
