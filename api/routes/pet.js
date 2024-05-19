const express = require("express");
const router = express.Router();
const {
  createPet,
  getAllPet,
  updatePetById,
  deletePetById,
  getPetById,
} = require("../controllers/petController");

router.post("/", createPet);
router.get("/:id", getAllPet);
router.get("/detail/:id", getPetById);
router.put("/:id", updatePetById);
router.delete("/:id", deletePetById);
module.exports = router;
