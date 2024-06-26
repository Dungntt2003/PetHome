const express = require("express");
const router = express.Router();
const {
  createNewCage,
  getAllCages,
  getAllType,
  getFreeCages,
  getDeadlineCage,
  updateCage,
  deleteCageById,
  getLivePet,
} = require("../controllers/cageController");

router.get("/", getAllCages);
router.get("/type", getAllType);
router.get("/free", getFreeCages);
router.get("/stop", getDeadlineCage);
router.get("/live", getLivePet);
router.post("/", createNewCage);
router.put("/:id", updateCage);
router.delete("/:id", deleteCageById);

module.exports = router;
