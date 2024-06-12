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
router.get("/doctor", getProcessForDoctor);
router.get("/pet", getProcessForPet);

module.exports = router;
