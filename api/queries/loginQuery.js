const createNewUser = "INSERT INTO person (email, password) VALUES ($1,$2)";

const checkUser = "SELECT password FROM person WHERE email = $1";

const checkDoctor = "SELECT password FROM doctor WHERE email = $1";

module.exports = {
  createNewUser,
  checkUser,
  checkDoctor,
};
