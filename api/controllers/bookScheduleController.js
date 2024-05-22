const pool = require("../../db");

const {
  createBook,
  updateBook,
  deleteBook,
  getBookByUser,
} = require("../queries/bookScheduleQuery");

const getBookScheduleByUser = (req, res, next) => {
  const id = req.params.id;
  pool.query(getBookByUser, [id], (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const createNewBook = (req, res, next) => {
  const { pet_id, bookDate, type } = req.body;
  pool.query(createBook, [pet_id, bookDate, type], (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).json({
        message: "Book scheduled successfully",
        id: results.rows[0].id,
      });
    }
  });
};

const updateBookById = (req, res, next) => {
  const id = req.params.id;
  const { pet_id, bookDate, type } = req.body;
  pool.query(updateBook, [pet_id, bookDate, type, id], (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).json({
        message: "Book updated successfully",
      });
    }
  });
};

const deleteBookById = (req, res, next) => {
  const id = req.params.id;
  pool.query(deleteBook, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).json({
        message: "Book deleted successfully",
      });
    }
  });
};

module.exports = {
  createNewBook,
  updateBookById,
  deleteBookById,
  getBookScheduleByUser,
};
