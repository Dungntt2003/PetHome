const insertCage = "INSERT INTO cage (hotel_id) VALUES ($1) RETURNING cage_id";

const getCage = "SELECT * FROM cage";
const getCageHotel = "SELECT * FROM cage where hotel_id = $1";
const getCageGroup = "SELECT * FROM cage ";

const getFreeHotel = `SELECT * FROM cage LEFT JOIN bookHotel on cage.cage_id = bookHotel.cage_id  
                        WHERE endDate <= CURRENT_DATE OR endDate is null`;

const getDeadHotel =
  'SELECT * FROM cage join bookHotel on cage.cage_id = bookHotel.cage_id where endDate = current_date - interval "1 day"';

const upgradeCage = "UPDATE cage set hotel_id = $1 where cage_id = $2";

const deleteCage = "DELETE FROM cage WHERE cage_id = $1";

module.exports = {
  insertCage,
  getCage,
  getCageHotel,
  getFreeHotel,
  getDeadHotel,
  upgradeCage,
  deleteCage,
};
