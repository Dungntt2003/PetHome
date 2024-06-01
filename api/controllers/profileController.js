const pool = require("../../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const {
  getAllUsers,
  insertUserInfo,
  updatePass,
  getInfo,
  getInfoDoctor,
  updateInfoDoctor,
  getInfoStaff,
  updateInfoStaff,
} = require("../queries/profileQuery");

const getListUsers = (req, res, next) => {
  pool.query(getAllUsers, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(result.rows);
    }
  });
};

const addUserInfo = (req, res, next) => {
  // name, dob,gender,phone, address
  const id = req.params.id;
  const { name, dob, gender, phone, address } = req.body;
  pool.query(
    insertUserInfo,
    [name, dob, gender, phone, address, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({
          message: "Update user info successfully",
        });
      }
    }
  );
};

const changePassword = (req, res, next) => {
  const id = req.params.id;
  const newPass = req.body.password;
  bcrypt.hash(newPass, saltRounds, function (err, hash) {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      pool.query(updatePass, [hash, id], (error, result) => {
        if (error) {
          res.status(500).json({
            message: error.message,
          });
        } else
          res.status(200).json({
            message: "Update password successfully",
          });
      });
    }
  });
};

const getUserInfo = (req, res, next) => {
  const id = req.params.id;
  pool.query(getInfo, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else res.status(200).json(result.rows[0]);
  });
};

const getDoctorInfo = (req, res, next) => {
  const id = req.params.id;
  pool.query(getInfoDoctor, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else res.status(200).json(result.rows[0]);
  });
};

const updateDoctorInfo = (req, res, next) => {
  const id = req.params.id;
  const { dob, gender, phone, address, achievements } = req.body;
  pool.query(
    updateInfoDoctor,
    [dob, gender, phone, address, achievements, id],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else
        res.status(200).json({
          message: "Update doctor info successfully",
        });
    }
  );
};

const getStaffInfo = (req, res, next) => {
  const id = req.params.id;
  pool.query(getInfoStaff, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else res.status(200).json(result.rows[0]);
  });
};

const updateStaffInfo = (req, res, next) => {
  const id = req.params.id;
  const { dob, gender, phone, address } = req.body;
  pool.query(
    updateInfoStaff,
    [dob, gender, phone, address, id],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else
        res.status(200).json({
          message: "Update staff info successfully",
        });
    }
  );
};
module.exports = {
  addUserInfo,
  changePassword,
  getUserInfo,
  getDoctorInfo,
  updateDoctorInfo,
  getStaffInfo,
  updateStaffInfo,
  getListUsers,
};
