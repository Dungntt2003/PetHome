const express = require("express");
const router = express.Router();
const {
  createNewCage,
  getFreeCage,
  getCageDelete,
  updateCageInfo,
  updateCageToNull,
  deleteCageById,
} = require("../controllers/cageController");

router.get("/free", getFreeCage);
router.get("/end", getCageDelete);
router.post("/", createNewCage);
router.put("/:id", updateCageInfo);
router.put("/free/:id", updateCageToNull);
router.delete("/:id", deleteCageById);

module.exports = router;
