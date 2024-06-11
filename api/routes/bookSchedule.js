const express = require("express");
const router = express.Router();
const {
  createNewHealth,
  createNewSalon,
  createNewHotel,
  updateResult,
  updateScheduleById,
  updateHotelBook,
  getListBookDoctor,
  getListBookStaff,
  getBookListHealth,
  getBookListSalon,
  getBookListHotel,
  getListUserHealth,
  getListUserSalon,
  getListUserHotel,
} = require("../controllers/bookScheduleController");

router.get("/staff/:id", getListBookStaff);
router.get("/doctor/:id", getListBookDoctor);
router.get("salon", getBookListSalon);
router.get("/hotel", getBookListHotel);
router.get("/health", getBookListHealth);
router.get("/health/:id", getListUserHealth);
router.get("/hotel/:id", getListUserHotel);
router.get("/salon/:id", getListUserSalon);
router.post("/salon", createNewSalon);
router.post("/health", createNewHealth);
router.post("/hotel", createNewHotel);
router.put("/result/:id", updateResult);
router.put("/:id", updateScheduleById);
router.put("/hotel/:id", updateHotelBook);
module.exports = router;
