const createNewUser = "INSERT INTO person (email, password) VALUES ($1,$2)";

const checkUser = "SELECT password FROM person WHERE email = $1";

const getAllUsers ='SELECT email from person';

module.exports = {
  createNewUser,
  checkUser,
  getAllUsers
};
