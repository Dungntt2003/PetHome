const express = require("express");
const router = express.Router();
const {
  createPet,
  getAllPet,
  updatePetById,
  deletePetById,
} = require("../controllers/petController");

router.post("/", createPet);
router.get("/:id", getAllPet);
router.put("/:id", updatePetById);
router.delete("/:id", deletePetById);
module.exports = router;
