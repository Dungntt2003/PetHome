const createNewUser = "INSERT INTO person (email, password) VALUES ($1,$2)";

const checkUser = "SELECT password, id FROM person WHERE email = $1";
const checkDoctor = "SELECT password, id FROM doctor WHERE email = $1";
const checkStaff = "SELECT password, id FROM staff WHERE email = $1";
module.exports = {
  createNewUser,
  checkUser,
  checkDoctor,
  checkStaff,
};
