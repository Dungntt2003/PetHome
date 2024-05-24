const pool = require("../../db");
const { insertUserInfo } = require("../queries/profileQuery");

const addUserInfo = (req, res, next) => {
  // name, dob,gender,phone, address
  const { name, dob, gender, phone, address } = req.body;
};
