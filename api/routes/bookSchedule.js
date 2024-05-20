const express = require("express");
const router = express.Router();
const {
  createNewBook,
  updateBookById,
  deleteBookById,
} = require("../controllers/bookScheduleController");

router.post("/", createNewBook);
router.put("/:id", updateBookById);
router.delete("/:id", deleteBookById);

module.exports = router;
