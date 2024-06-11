const pool = require("../../db");
const {
  insertCage,
  getCage,
  getAllCage,
  // getCageHotel,
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
const getAllCages = (req, res, next) => {
  pool.query(getCage, (err, result) => {
    if (err) {
      res.status(200).json({
        message: err.message,
      });
    } else res.status(200).json(result.rows);
  });
};

const getAllType = (req, res, next) => {
  pool.query(getAllCage, (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else res.status(200).json(result.rows);
  });
};

const getFreeCages = (req, res, next) => {
  pool.query(getFreeHotel, (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else res.status(200).json(result.rows);
  });
};

const getDeadlineCage = (req, res, next) => {
  pool.query(getDeadHotel, (err, result) => {
    pool.query(getFreeHotel, (err, result) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else res.status(200).json(result.rows);
    });
  });
};

const updateCage = (req, res, next) => {
  const id = req.params.id;
  const hotel_id = req.body.hotel_id;
  pool.query(upgradeCage, [hotel_id, id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else
      res.status(200).json({
        message: "Update cage successfully",
      });
  });
};

const deleteCageById = (req, res, next) => {
  const id = req.params.id;
  pool.query(deleteCage, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else
      res.status(200).json({
        message: "Delete cage successfully",
      });
  });
};
module.exports = {
  createNewCage,
  getAllCages,
  getAllType,
  getFreeCages,
  getDeadlineCage,
  updateCage,
  deleteCageById,
};
