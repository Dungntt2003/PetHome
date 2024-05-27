const createBook =
  "INSERT INTO bookschedule (pet_id, bookDate, type) VALUES ($1, $2, $3) RETURNING id";
const createBookv2 =
  "INSERT INTO bookschedule (pet_id,  doctor_id, bookDate, result, type) VALUES ($1, $2, $3,'Thành công', $4) RETURNING id;";
const getBookByUser =
  "SELECT doctor_id, name,bookdate, result, bookschedule.type FROM bookschedule join pet on bookschedule.pet_id = pet.id where owner_id = $1";
const updateBook =
  "UPDATE bookschedule SET pet_id = $1, bookDate = $2, type = $3 WHERE id = $4";

const getAllBook = "SELECT * FROM bookschedule";
const getAllBookDoctor = "SELECT * FROM bookschedule WHERE doctor_id = $1";

const deleteBook = "DELETE FROM bookschedule WHERE id = $1";

const updateBookSuccess =
  "UPDATE bookschedule SET doctor_id = $1, result = 'Thành công' WHERE id = $2";
const updateBookSuccessv2 =
  "UPDATE bookschedule SET result = 'Thành công' WHERE id = $1";
const updateBookFail =
  "UPDATE bookschedule SET result = 'Từ chối' WHERE id = $1 ";

module.exports = {
  createBook,
  updateBook,
  deleteBook,
  getBookByUser,
  getAllBook,
  createBookv2,
  updateBookSuccess,
  updateBookSuccessv2,
  updateBookFail,
  getAllBookDoctor,
};
