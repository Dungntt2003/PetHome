const pool = require("../../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const {
  createNewUser,
  checkUser,
  getAllUsers,
  checkDoctor,
  updateUser,
  deleteUser,
} = require("../queries/loginQuery");

const registerNewUser = (req, res, next) => {
  const { email, password } = req.body;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      return res.status(403).json({
        message: err.message,
      });
    }
    pool.query(createNewUser, [email, hash], (error, result) => {
      if (error) {
        res.status(500).json({
          error: error.message,
        });
      } else
        res.status(200).json({
          message: "Create user successfully completed",
        });
    });
  });
};

const checkUserLogin = (req, res, next) => {
  const { email, password } = req.body;
  pool.query(checkUser, [email], (err, result) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
      return;
    }
    if (result.rows.length > 0) {
      const hash = result.rows[0].password;
      const id = result.rows[0].id;
      bcrypt.compare(password, hash, function (err, result1) {
        if (err) {
          res.status(500).json({
            message: err.message,
          });
          return;
        }
        if (result1) {
          res.status(200).json(
            {
              message: "Login successfully",
              id: id,
            },
          );
          return;
        }
        res.status(401).json([{
          message: "Wrong password",
        }]);
      });
    } else {
      res.status(409).json([{
        message: "Invalid email",
      }]);
    }
  });
};

const getUser = (req, res, next) => {
  pool.query(getAllUsers, (err, result) => {
    if (err)
      return res.status(500).json({
        message: err.message,
      });
    if (result.rows.length === 0) {
      res.status(404).json({
        message: "No users found",
      });
    }
    return res.status(200).json(result.rows);
  });
};
const checkDoctorLogin = (req, res, next) => {
  const { email, password } = req.body;
  pool.query(checkDoctor, [email], (err, result) => {
    if (err)
      res.status(500).json({
        message: err.message,
      });
    if (result.rows.length === 0)
      res.status(404).json({
        message: "Doctor not found",
      });
    else {
      const realPass = result.rows[0].password;
      if (realPass != password)
        res.status(409).json({
          message: "Password mismatch",
        });
      res.status(200).json({
        message: "Login successfully",
      });
    }
  });
};
const updateUserById = (req, res, next) => {
  const id = req.params.id;
  const { password } = req.body;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      return res.status(403).json({
        message: err.message,
      });
    }
    pool.query(updateUser, [hash, id], (error, result) => {
      if (error) {
        res.status(500).json({
          error: error.message,
        });
      } else
        res.status(200).json({
          message: "Update user successfully completed",
        });
    });
  });
};

const deleteUserById = (req, res, next) => {
  const id = req.params.id;
  pool.query(deleteUser, [id], (error, result) => {
    if (error) {
      res.status(500).json({
        error: error.message,
      });
    } else
      res.status(200).json({
        message: "Delete user successfully completed",
      });
  });
};
module.exports = {
  registerNewUser,
  checkUserLogin,
  checkDoctorLogin,
  getUser,
  updateUserById,
  deleteUserById,
};
