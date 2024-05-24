const insertUserInfo =
  "UPDATE person SET name = $1, dob = $2, gender = $3, phone = $4, address = $5 where id = $6";

const updatePass = "UPDATE person SET password = $1 WHERE id = $2";

const getInfo =
  "SELECT email, name, dob, gender, phone, address FROM person WHERE id = $1";

const getInfoDoctor =
  "SELECT email, name, dob, gender, phone, address, university, graduationyear, achievements, experienceyear from doctor where id = $1";

module.exports = { insertUserInfo, updatePass, getInfo, getInfoDoctor };
