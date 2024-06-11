const pool = require("../../db");
const {
  insertCage,
  getCage,
  getCageHotel,
  getFreeHotel,
  getDeadHotel,
  upgradeCage,
  deleteCage,
} = require("../queries/cageQuery");

const createNewCage = (req, res, next) => {
  const hotel_id = req.params.hotel_id;
  pool.query(insertCage, [hotel_id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else
      res.status(200).json({
        message: "Created cage successfully",
        cage_id: result.rows[0].cage_id,
      });
  });
};

module.exports = {};
