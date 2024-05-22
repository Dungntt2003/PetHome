const express = require("express");
const router = express.Router();
const {
  createNewBook,
  updateBookById,
  deleteBookById,
  getBookScheduleByUser,
} = require("../controllers/bookScheduleController");

router.post("/", createNewBook);
router.get("/:id", getBookScheduleByUser);
router.put("/:id", updateBookById);
router.delete("/:id", deleteBookById);

module.exports = router;
