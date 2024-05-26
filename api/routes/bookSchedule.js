const express = require("express");
const router = express.Router();
const {
  createNewBook,
  updateBookById,
  deleteBookById,
  getBookScheduleByUser,
  getAllForStaff,
  createBookByStaff,
  updateBookFailStaff,
  updateBookSuccessStaff,
  updateBookSuccessStaffv2,
  getAllBookForDoctor,
} = require("../controllers/bookScheduleController");

router.get("/", getAllForStaff);
router.get("/:id", getBookScheduleByUser);
router.get("/doctor/:id", getAllBookForDoctor);
router.post("/staff", createBookByStaff);
router.post("/", createNewBook);
router.put("/:id", updateBookById);
router.put("/staff/success/:id", updateBookSuccessStaff);
router.put("/staff/success/v2/:id", updateBookSuccessStaffv2);
router.put("/staff/fail/:id", updateBookFailStaff);
router.delete("/:id", deleteBookById);

module.exports = router;
