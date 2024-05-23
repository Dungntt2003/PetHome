const express = require("express");
const router = express.Router();
const {
  getAllDataServices,
  createNewService,
  createHealthService,
  createSalonService,
  createHotelService,
  updateServiceById,
  updateHealth,
  updateSalon,
  updateHotel,
  deleteServiceById,
  getServiceById,
} = require("../controllers/serviceListController");

router.get("/", getAllDataServices);
router.post("/", createNewService);
router.get("/:id", getServiceById);
router.post("/health", createHealthService);
router.post("/salon", createSalonService);
router.post("/hotel", createHotelService);
router.put("/:id", updateServiceById);
router.put("/health/:id", updateHealth);
router.put("/salon/:id", updateSalon);
router.put("/hotel/:id", updateHotel);
router.delete("/:id", deleteServiceById);

module.exports = router;
