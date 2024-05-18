const createNewUser = "INSERT INTO person (email, password) VALUES ($1,$2)";

const checkUser = "SELECT password FROM person WHERE email = $1";

const getAllUsers ='SELECT email from person';
const checkDoctor = "SELECT password FROM doctor WHERE email = $1";

module.exports = {
  createNewUser,
  checkUser,
  getAllUsers,
  checkDoctor
};
