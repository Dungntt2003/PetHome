const createNewPet =
  "INSERT INTO pet (name, dob, gender,type, hobby, owner_id) VALUES ($1,$2,$3,$4,$5, $6)";

const getPet = "SELECT * From pet WHERE owner_id = $1";

const updatePet =
  "UPDATE pet SET name = $1,  dob = $2, gender = $3, type = $4, hobby = $5 WHERE id = $6";

const checkPetExist = "SELECT * FROM pet where id = $1";

const deletePet = "DELETE FROM pet WHERE id = $1";

module.exports = { createNewPet, getPet, updatePet, checkPetExist, deletePet };
