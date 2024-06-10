const createSchedule =
  "INSERT INTO bookschedule (pet_id, bookDate,result, service_id, note) VALUES ($1, $2, $3, $4, $5) RETURNING id";

const createSalon = "INSERT INTO bookSalon (id, staff_id) VALUES ($1, $2)";

const createHealth = "INSERT INTO bookHealth (id, doctor_id) VALUES ($1, $2)";

const createHotel =
  "INSERT INTO bookHotel (id, endDate, cage_id) VALUES ($1, $2, $3)";

const resultSchedule =
  "UPDATE bookschedule SET result = $1, note = $2, endTime = $3 where id = $4";

const updateSchedule =
  "UPDATE bookschedule SET pet_id = $1, bookDate = $2, note = $3 where id =  $4";

const updateHotel = "UPDATE bookHotel SET endDate = $1 where id = $2";

const getScheduleUser =
  "SELECT * FROM bookschedule join pet on bookschedule.pet_id = pet.id where owner_id = $1";
const getScheduleStaff =
  "SELECT * FROM bookschedule join bookSalon on bookschedule.id = bookSalon.id WHERE staff_id = $1";
const getScheduleDoctor =
  "SELECT * FROM bookschedule join bookHealth on bookschedule.id = bookHealth.id WHERE doctor_id = $1";

const getBookSalon =
  "SELECT * FROM bookschedule join bookSalon on bookschedule.id = bookSalon.id";
const getBookHealth =
  "SELECT * FROM bookschedule join bookHealth on bookSchedule.id = bookHealth.id";
const getBookHotel =
  "SELECT * FROM bookschedule join bookHotel on bookSchedule.id = bookHotel.id";

module.exports = {
  createSchedule,
  createHotel,
  createSalon,
  createHealth,
  resultSchedule,
  updateSchedule,
  updateHotel,
  getScheduleDoctor,
  getScheduleStaff,
  getScheduleUser,
  getBookSalon,
  getBookHealth,
  getBookHotel,
};
