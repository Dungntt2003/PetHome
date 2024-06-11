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
  getListBookUser,
  getBookListHealth,
  getBookListSalon,
  getBookListHotel,
} = require("../controllers/bookScheduleController");

router.get("/staff/:id", getListBookStaff);
router.get("/:id", getListBookUser);
router.get("/doctor/:id", getListBookDoctor);
router.get("salon", getBookListSalon);
router.get("/hotel", getBookListHotel);
router.get("/health", getBookListHealth);
router.post("/salon", createNewSalon);
router.post("/heath", createNewHealth);
router.post("/hotel", createNewHotel);
router.put("/result/:id", updateResult);
router.put("/:id", updateScheduleById);
router.put("/hotel/:id", updateHotelBook);
module.exports = router;
