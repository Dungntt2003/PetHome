const pool = require("../../db");
const {
  createHealth,
  createHotel,
  createSchedule,
  createSalon,
  resultSchedule,
  updateSchedule,
  updateHotel,
  getScheduleDoctor,
  getScheduleStaff,
  getBookHealth,
  getBookSalon,
  getBookHotel,
  getScheduleUserHealth,
  getScheduleUserHotel,
  getScheduleUserSalon,
} = require("../queries/bookScheduleQuery");

const createNewHealth = (req, res, next) => {
  const pet_id = req.body.pet_id;
  const bookDate = req.body.bookDate;
  const result = req.body.result;
  const service_id = req.body.service_id;
  const note = req.body.note;

  pool.query(
    createSchedule,
    [pet_id, bookDate, result, service_id, note],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else {
        const id = result.rows[0].id;
        const doctor_id = req.body.doctor_id;
        pool.query(createHealth, [id, doctor_id], (error, res1) => {
          if (error) {
            res.status(500).json({
              message: error.message,
            });
          } else {
            res.status(200).json({
              message: "Create health schedule successfully",
              id: id,
            });
          }
        });
      }
    }
  );
};

const createNewSalon = (req, res, next) => {
  const pet_id = req.body.pet_id;
  const bookDate = req.body.bookDate;
  const result = req.body.result;
  const service_id = req.body.service_id;
  const note = req.body.note;

  pool.query(
    createSchedule,
    [pet_id, bookDate, result, service_id, note],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else {
        const id = result.rows[0].id;
        const staff_id = req.body.staff_id;
        pool.query(createSalon, [id, staff_id], (error, res1) => {
          if (error) {
            res.status(500).json({
              message: error.message,
            });
          } else {
            res.status(200).json({
              message: "Create salon schedule successfully",
              id: id,
            });
          }
        });
      }
    }
  );
};

const createNewHotel = (req, res, next) => {
  const pet_id = req.body.pet_id;
  const bookDate = req.body.bookDate;
  const result = req.body.result;
  const service_id = req.body.service_id;
  const note = req.body.note;

  pool.query(
    createSchedule,
    [pet_id, bookDate, result, service_id, note],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else {
        const id = result.rows[0].id;
        const endDate = req.body.endDate;
        const cage_id = req.body.cage_id;
        pool.query(createHotel, [id, endDate, cage_id], (error, res1) => {
          if (error) {
            res.status(500).json({
              message: error.message,
            });
          } else {
            res.status(200).json({
              message: "Create hotel schedule successfully",
              id: id,
            });
          }
        });
      }
    }
  );
};

const updateResult = (req, res, next) => {
  const result = req.body.result;
  const note = req.body.note;
  const endTime = req.body.endTime;
  const id = req.params.id;
  pool.query(resultSchedule, [result, note, endTime, id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(200).json({
        message: "Update result schedule successfully",
      });
    }
  });
};

const updateScheduleById = (req, res, next) => {
  const id = req.params.id;
  const pet_id = req.body.pet_id;
  const bookDate = req.body.bookDate;
  const note = req.body.note;
  pool.query(updateSchedule, [pet_id, bookDate, note, id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(200).json({
        message: "Update schedule completed",
      });
    }
  });
};

const updateHotelBook = (req, res, next) => {
  const id = req.params.id;
  const pet_id = req.body.pet_id;
  const bookDate = req.body.bookDate;
  const note = req.body.note;
  const endDate = req.body.endDate;
  pool.query(updateSchedule, [pet_id, bookDate, note, id], (err, result) => {
    if (err) {
      res.status(200).json({
        message: err.message,
      });
    } else {
      pool.query(updateHotel, [endDate, id], (error, res1) => {
        if (error) {
          res.status(500).json({
            message: error.message,
          });
        } else {
          res.status(200).json({
            message: "Updated scheduled hotel successfully",
          });
        }
      });
    }
  });
};

const getListBookStaff = (req, res, next) => {
  const id = req.params.id;
  pool.query(getScheduleStaff, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(200).json(result.rows);
    }
  });
};

const getListUserHealth = (req, res, next) => {
  const id = req.params.id;
  pool.query(getScheduleUserHealth, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else result.status(200).json(result.rows);
  });
};

const getListUserHotel = (req, res, next) => {
  const id = req.params.id;
  pool.query(getScheduleUserHotel, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else result.status(200).json(result.rows);
  });
};
const getListUserSalon = (req, res, next) => {
  const id = req.params.id;
  pool.query(getScheduleUserSalon, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else result.status(200).json(result.rows);
  });
};

const getListBookDoctor = (req, res, next) => {
  const id = req.params.id;
  pool.query(getScheduleDoctor, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(200).json(result.rows);
    }
  });
};

const getBookListHealth = (req, res, next) => {
  pool.query(getBookHealth, (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else res.status(200).json(result.rows);
  });
};

const getBookListHotel = (req, res, next) => {
  pool.query(getBookHotel, (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else res.status(200).json(result.rows);
  });
};

const getBookListSalon = (req, res, next) => {
  pool.query(getBookSalon, (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else res.status(200).json(result.rows);
  });
};

module.exports = {
  createNewHealth,
  createNewHotel,
  createNewSalon,
  updateResult,
  updateScheduleById,
  updateHotelBook,
  getListBookDoctor,
  getListBookStaff,
  getBookListHealth,
  getBookListHotel,
  getBookListSalon,
  getListUserHealth,
  getListUserHotel,
  getListUserSalon,
};
