const insertCage = "INSERT INTO cage (hotel_id) VALUES ($1) RETURNING cage_id";

const getCage = "SELECT * FROM cage";
const getCageHotel = "SELECT * FROM cage where hotel_id = $1";
const getAllCage =
  "SELECT * FROM cage LEFT JOIN (bookHotel join bookschedule using (id)) on cage.cage_id = bookHotel.cage_id";

const getFreeHotel = `SELECT DISTINCT cage.cage_id FROM cage LEFT JOIN bookHotel on cage.cage_id = bookHotel.cage_id  
                        WHERE endDate <= CURRENT_DATE OR endDate is null`;

const getDeadHotel =
  'SELECT * FROM cage join bookHotel on cage.cage_id = bookHotel.cage_id where endDate = current_date - interval "1 day" and endDate is not null';

const upgradeCage = "UPDATE cage set hotel_id = $1 where cage_id = $2";

const deleteCage = "DELETE FROM cage WHERE cage_id = $1";
const getLiveCage =
  "SELECT DISTINCT bookHotel.cage_id FROM bookHotel join bookschedule using (id) WHERE endDate > CURRENT_DATE";

module.exports = {
  insertCage,
  getCage,
  getAllCage,
  getCageHotel,
  getFreeHotel,
  getDeadHotel,
  upgradeCage,
  deleteCage,
  getLiveCage,
};
