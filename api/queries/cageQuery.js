const insertNewCage = "INSERT INTO inhotel (hotel_id) VALUES RETURNING id;";

const getCageFree = "SELECT * FROM inhotel WHERE pet_id is null;";

const getCageToDelete =
  "SELECT * FROM inhotel WHERE ABS(CURRENT_DATE - endtime) <= 1;";

const updateCage =
  "UPDATE inhotel SET pet_id = $1, starttime = $2, endtime = $3 WHERE id = $4;";

const deleteOldCage =
  "UPDATE inhotel SET pet_id = null, starttime = null, endtime = null WHERE id = $1";

const deleteCage = "DELETE FROM inhotel WHERE id = $1";

module.exports = {
  insertNewCage,
  getCageFree,
  getCageToDelete,
  updateCage,
  deleteOldCage,
  deleteCage,
};
