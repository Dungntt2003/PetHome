const createNewUser = "INSERT INTO person (email, password) VALUES ($1,$2)";

const checkUser = "SELECT password, id FROM person WHERE email = $1";

const getAllUsers = "SELECT email from person";
const checkDoctor = "SELECT password FROM doctor WHERE email = $1";
const updateUser = "UPDATE person SET password = $1 where id = $2";
const deleteUser = "DELETE FROM person WHERE id = $1";
module.exports = {
  createNewUser,
  checkUser,
  getAllUsers,
  checkDoctor,
  updateUser,
  deleteUser,
};
