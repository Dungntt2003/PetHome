const pool = require("../../db");

const {
  getTablePrice,
  insertNew,
  updatePrice,
} = require("../queries/priceExchangeQuery");

const getAllExchanges = (req, res, next) => {
  pool.query(getTablePrice, (err, result) => {
    if (err)
      res.status(500).json({
        message: err.message,
      });
    else res.status(200).json(result.rows);
  });
};
const createNew = (req, res, next) => {
  const { weight, factor } = req.body;
  pool.query(insertNew, [weight, factor], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(200).json({
        message: "Created successfully",
        id: result.rows[0].id,
      });
    }
  });
};

const updateExchange = (req, res, next) => {
  const id = req.params.id;
  const weight = req.body.weight;
  const factor = req.body.factor;
  pool.query(updatePrice, [weight, factor, id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else
      res.status(200).json({
        message: "Update price exchange successfully",
      });
  });
};

module.exports = {
  getAllExchanges,
  createNew,
  updateExchange,
};
