const pool = require("../../db");
const {
  createNewPet,
  getPet,
  updatePet,
  checkPetExist,
  deletePet,
} = require("../queries/petQuery");

const getAllPet = (req, res, next) => {
  const id = req.params.id;
  pool.query(getPet, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else if (result.rows.length === 0) {
      res.status(404).json({
        message: "Pet not found",
      });
    } else {
      res.status(200).json(result.rows);
    }
  });
};

const getPetById = (req, res, next) => {
  const id = req.params.id;
  pool.query(checkPetExist, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      if (result.rows.length === 0) {
        res.status(404).json({
          message: "Pet not found",
        });
      } else {
        res.status(200).json(result.rows);
      }
    }
  });
};
const createPet = (req, res, next) => {
  const { name, dob, gender, type, hobby, owner_id } = req.body;

  pool.query(
    createNewPet,
    [name, dob, gender, type, hobby, owner_id],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else {
        // console.log(result.rows[0].id);
        res.status(200).json({
          message: "Pet created successfully",
          id: result.rows[0].id,
        });
      }
    }
  );
};

const updatePetById = (req, res, next) => {
  const id = req.params.id;
  pool.query(checkPetExist, [id], (err, result) => {
    if (err)
      res.status(500).json({
        message: err.message,
      });
    else if (result.rows.length === 0) {
      res.status(404).json({
        message: "Pet not found",
      });
    } else {
      const name = req.body.name;
      const dob = req.body.dob;
      const gender = req.body.gender;
      const type = req.body.type;
      const hobby = req.body.hobby;
      pool.query(
        updatePet,
        [name, dob, gender, type, hobby, id],
        (err, result) => {
          if (err) {
            res.status(500).json({
              message: err.message,
            });
          } else {
            res.status(200).json({
              message: "Pet updated successfully",
            });
          }
        }
      );
    }
  });
};

const deletePetById = (req, res, next) => {
  const id = req.params.id;
  pool.query(checkPetExist, [id], (err, result) => {
    if (err)
      res.status(500).json({
        message: err.message,
      });
    else if (result.rows.length === 0) {
      res.status(404).json({
        message: "Pet not found",
      });
    } else {
      pool.query(deletePet, [id], (err, result) => {
        if (err) {
          res.status(500).json({
            message: err.message,
          });
        } else {
          res.status(200).json({
            message: "Pet deleted successfully",
          });
        }
      });
    }
  });
};

module.exports = {
  createPet,
  getAllPet,
  updatePetById,
  deletePetById,
  getPetById,
};
