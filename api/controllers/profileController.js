const pool = require("../../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const {
  insertUserInfo,
  updatePass,
  getInfo,
  getInfoDoctor,
  updateInfoDoctor,
} = require("../queries/profileQuery");

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
module.exports = {
  addUserInfo,
  changePassword,
  getUserInfo,
  getDoctorInfo,
  updateDoctorInfo,
};
