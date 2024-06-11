const getAllServices = "SELECT * FROM service_list";
const getAService = "SELECT * FROM service_item WHERE service_id = $1";
const getHealthService = "SELECT * FROM sicktype join service_item using (id)";
const getSalonService =
  "SELECT * FROM servicetype join service_item using (id)";
const getHotelService = "SELECT * FROM hotel join service_item using (id)";

const getDetailHotel =
  "SELECT * FROM service_item join hotel using (id) where id = $1";
const getDetailSalon =
  "SELECT * FROM servicetype join service_item using (id) where id = $1";
const getDetailHealth =
  "SELECT * FROM sicktype join service_item using (id) where id = $1";

const insertNewService =
  "INSERT INTO service_list (name, introduction) VALUES ($1,$2) RETURNING id";
const insertSubService =
  "INSERT INTO service_item (name, introduction, price, service_id) VALUES ($1,$2,$3,$4) RETURNING id";
const insertHealthService =
  "INSERT INTO sicktype (id, symptom, treatment) VALUES ($1,$2,$3)";
const insertSalonService =
  "INSERT INTO servicetype (id, process, quantitative) VALUES ($1,$2,$3)";
const insertHotelService =
  "INSERT INTO hotel (id, diet, takeExercise,airconditioning, heating, clean, camera) VALUES ($1,$2,$3,$4,$5,$6,$7)";
const updateService =
  "UPDATE service_list SET name = $1, introduction = $2 where id = $3";
const updateGeneral =
  "UPDATE service_item SET name = $1, introduction = $2 , price = $3 where id = $4";
const updateHealthService =
  "UPDATE sicktype SET symptom = $1, treatment = $2 where id = $3";
const updateSalonService =
  "UPDATE servicetype SET process = $1, quantitative = $2 where id = $3";
const updateHotelService =
  "UPDATE hotel SET diet = $1, takeExercise = $2,airconditioning = $3, heating = $4, clean = $5, camera = $6 where id = $7";
const deleteService = "DELETE FROM service_item WHERE id = $1";
module.exports = {
  getAllServices,
  getAService,
  getHealthService,
  getHotelService,
  getSalonService,
  insertNewService,
  insertSubService,
  insertHealthService,
  insertSalonService,
  insertHotelService,
  deleteService,
  updateService,
  updateGeneral,
  updateHealthService,
  updateHotelService,
  updateSalonService,
  getDetailHealth,
  getDetailHotel,
  getDetailSalon,
};
