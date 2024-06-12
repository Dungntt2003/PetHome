const express = require("express");
const router = express.Router();
const {
  createNewProcess,
  updateProcessById,
  getProcessById,
  getProcessForDoctor,
  getProcessForPet,
} = require("../controllers/processController");

router.get("/:id", getProcessById);
router.post("/", createNewProcess);
router.put("/:id", updateProcessById);
router.get("/doctor/:doctor_id", getProcessForDoctor);
router.get("/pet/:pet_id", getProcessForPet);

module.exports = router;
