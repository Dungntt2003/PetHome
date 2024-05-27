const pool = require("../../db");

const {
  createBook,
  updateBook,
  deleteBook,
  getBookByUser,
  getAllBook,
  createBookv2,
  updateBookFail,
  updateBookSuccess,
  getAllBookDoctor,
  updateBookSuccessv2,
} = require("../queries/bookScheduleQuery");

const createBookByStaff = (req, res, next) => {
  const { pet_id, doctor_id, bookDate, type } = req.body;
  pool.query(
    createBookv2,
    [pet_id, doctor_id, bookDate, type],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else {
        const id = result.rows[0].id;
        res.status(200).json({
          message: "Book scheduled successfully",
          id: id,
        });
      }
    }
  );
};

const getAllForStaff = (req, res, next) => {
  pool.query(getAllBook, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(200).json(results.rows);
    }
  });
};

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

const getAllBookForDoctor = (req, res, next) => {
  const id = req.params.id;
  pool.query(getAllBookDoctor, [id], (err, results) => {
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
      const id = results.rows[0].id;
      res.status(200).json({
        message: "Created book scheduled successfully",
        id: id,
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

const updateBookSuccessStaff = (req, res, next) => {
  const doctor_id = req.body.doctor_id;
  const id = req.params.id;
  pool.query(updateBookSuccess, [doctor_id, id], (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).json({
        message: "Book updated successfully",
      });
    }
  });
};

const updateBookSuccessStaffv2 = (req, res, next) => {
  const id = req.params.id;
  pool.query(updateBookSuccessv2, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else
      res.status(200).json({
        message: "Book successfully updated",
      });
  });
};

const updateBookFailStaff = (req, res, next) => {
  const id = req.params.id;
  pool.query(updateBookFail, [id], (err, result) => {
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
  getAllForStaff,
  createBookByStaff,
  updateBookSuccessStaff,
  updateBookSuccessStaffv2,
  updateBookFailStaff,
  getAllBookForDoctor,
};
