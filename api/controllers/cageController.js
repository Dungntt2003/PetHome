const pool = require("../../db");
const {
  insertNewCage,
  getCageFree,
  getCageToDelete,
  updateCage,
  deleteCage,
  deleteOldCage,
} = require("../queries/cageQuery");

const createNewCage = (req, res, next) => {
  const hotel_id = req.body.hotel_id;
  pool.query(insertNewCage, [hotel_id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else
      res.status(200).json({
        message: "New cage created",
        id: result.rows[0].id,
      });
  });
};
const getFreeCage = (req, res, next) => {
  pool.query(getCageFree, (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else res.status(200).json(result.rows);
  });
};

const getCageDelete = (req, res, next) => {
  pool.query(getCageToDelete, (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else res.status(200).json(result.rows);
  });
};

const updateCageInfo = (req, res, next) => {
  const id = req.params.id;
  const { pet_id, starttime, endtime } = req.body;
  pool.query(updateCage, [pet_id, starttime, endtime, id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else
      res.status(200).json({
        message: "Cage updated",
      });
  });
};

const updateCageToNull = (req, res, next) => {
  const id = req.params.id;
  pool.query(deleteCage, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else
      res.status(200).json({
        message: "Cage updated",
      });
  });
};

const deleteCageById = (req, res, next) => {
  const id = req.params.id;
  pool.query(deleteOldCage, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else
      res.status(200).json({
        message: "Cage deleted",
      });
  });
};

module.exports = {
  createNewCage,
  getFreeCage,
  getCageDelete,
  updateCageInfo,
  updateCageToNull,
  deleteCageById,
};
