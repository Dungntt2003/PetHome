const pool = require("../../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { createNewUser, checkUser, getAllUsers } = require("../queries/loginQuery");

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
      bcrypt.compare(password, hash, function (err, result) {
        if (err) {
          res.status(500).json({
            message: err.message,
          });
          return;
        }
        if (result) {
          res.status(200).json({
            message: "Login successfully",
          });
          return;
        }
        res.status(401).json({
          message: "Wrong password",
        });
      });
    } else {
      res.status(409).json({
        message: "Invalid email",
      });
    }
  });
};

const getUser= (req, res, next) => {
  pool.query(getAllUsers, (err, result) => {
    if (err) return res.status(500).json({
      message: err.message
    })
    return res.status(200).json(result.rows)
  })
}
module.exports = { registerNewUser, checkUserLogin , getUser};
