const createBook =
  "INSERT INTO bookschedule (pet_id, bookDate, type) VALUES ($1, $2, $3) RETURNING id";
const getBookByUser =
  "SELECT doctor_id, name,bookdate, result, bookschedule.type FROM bookschedule join pet on bookschedule.pet_id = pet.id where owner_id = $1";
const updateBook =
  "UPDATE bookschedule SET pet_id = $1, bookDate = $2, type = $3 WHERE id = $4";

const deleteBook = "DELETE FROM bookschedule WHERE id = $1";

module.exports = { createBook, updateBook, deleteBook, getBookByUser };
