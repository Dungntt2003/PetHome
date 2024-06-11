const pool = require("../../db");
const {
  getAllServices,
  getAService,
  getSalonService,
  getHealthService,
  getHotelService,
  insertNewService,
  insertSubService,
  insertHealthService,
  insertSalonService,
  insertHotelService,
  deleteService,
  updateGeneral,
  updateService,
  updateHealthService,
  updateSalonService,
  updateHotelService,
  getDetailHealth,
  getDetailHotel,
  getDetailSalon,
} = require("../queries/serviceListQuery");

const getAllDataServices = (req, res, next) => {
  pool.query(getAllServices, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else res.status(200).json(results.rows);
  });
};

const getServiceById = (req, res, next) => {
  const id = req.params.id;
  // console.log(typeof id);
  if (id === "1") {
    pool.query(getHealthService, (err, results) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else res.status(200).json(results.rows);
    });
  } else if (id == "2") {
    pool.query(getSalonService, (err, results) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else res.status(200).json(results.rows);
    });
  } else {
    pool.query(getHotelService, (err, results) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else res.status(200).json(results.rows);
    });
  }
};

const getHealth = (req, res, next) => {
  pool.query(getHealthService, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else res.status(200).json(results.rows);
  });
};

const getSalon = (req, res, next) => {
  pool.query(getSalonService, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else res.status(200).json(results.rows);
  });
};

const getHotel = (req, res, next) => {
  pool.query(getHotelService, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else res.status(200).json(results.rows);
  });
};
const createNewService = (req, res, next) => {
  const { name, introduction } = req.body;
  pool.query(insertNewService, [name, introduction], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else
      res.status(200).json({
        message: "Created new service successfully",
        id: result.rows[0].id,
      });
  });
};

const createHealthService = (req, res, next) => {
  const name = req.body.name;
  const introduction = req.body.introduction;
  const price = req.body.price;
  const service_id = req.body.service_id;
  const symptom = req.body.symptom;
  const treatment = req.body.treatment;
  pool.query(
    insertSubService,
    [name, introduction, price, service_id],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else {
        const id = result.rows[0].id;
        pool.query(
          insertHealthService,
          [id, symptom, treatment],
          (err, result1) => {
            if (err) {
              res.status(500).json({
                message: err.message,
              });
            } else
              res.status(200).json({
                message: "Created new health service successfully",
                id: id,
              });
          }
        );
      }
    }
  );
};
const createSalonService = (req, res, next) => {
  const name = req.body.name;
  const introduction = req.body.introduction;
  const price = req.body.price;
  const service_id = req.body.service_id;
  const process = req.body.process;
  const quantitative = req.body.quantitative;
  pool.query(
    insertSubService,
    [name, introduction, price, service_id],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else {
        const id = result.rows[0].id;
        pool.query(
          insertSalonService,
          [id, process, quantitative],
          (err, result1) => {
            if (err) {
              res.status(500).json({
                message: err.message,
              });
            } else
              res.status(200).json({
                message: "Created new salon service successfully",
                id: id,
              });
          }
        );
      }
    }
  );
};
const createHotelService = (req, res, next) => {
  const name = req.body.name;
  const introduction = req.body.introduction;
  const price = req.body.price;
  const service_id = req.body.service_id;
  // diet, takeExercise,airconditioning, heating, clean, camera
  const diet = req.body.diet;
  const takeExercise = req.body.takeExercise;
  const airconditioning = req.body.airconditioning;
  const heating = req.body.heating;
  const clean = req.body.clean;
  const camera = req.body.camera;
  pool.query(
    insertSubService,
    [name, introduction, price, service_id],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else {
        const id = result.rows[0].id;
        pool.query(
          insertHotelService,
          [id, diet, takeExercise, airconditioning, heating, clean, camera],
          (err, result1) => {
            if (err) {
              res.status(500).json({
                message: err.message,
              });
            } else
              res.status(200).json({
                message: "Created new hotel service successfully",
                id: id,
              });
          }
        );
      }
    }
  );
};
const updateServiceById = (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const introduction = req.body.introduction;
  const price = req.body.price;
  pool.query(updateGeneral, [name, introduction, price, id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(200).json({
        message: "Updated service successfully",
      });
    }
  });
};
const updateHealth = (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const introduction = req.body.introduction;
  const price = req.body.price;
  const symptom = req.body.symptom;
  const treatment = req.body.treatment;
  pool.query(updateGeneral, [name, introduction, price, id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      pool.query(updateHealthService, [symptom, treatment, id], (err, res1) => {
        if (err) {
          res.status(500).json({
            message: err.message,
          });
        } else {
          res.status(200).json({
            message: "Updated health service successfully",
          });
        }
      });
    }
  });
};
const updateSalon = (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const introduction = req.body.introduction;
  const price = req.body.price;
  const process = req.body.process;
  const quantitative = req.body.quantitative;
  pool.query(updateGeneral, [name, introduction, price, id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      pool.query(
        updateSalonService,
        [process, quantitative, id],
        (err, res1) => {
          if (err) {
            res.status(500).json({
              message: err.message,
            });
          } else {
            res.status(200).json({
              message: "Updated salon service successfully",
            });
          }
        }
      );
    }
  });
};
const updateHotel = (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const introduction = req.body.introduction;
  const price = req.body.price;
  const diet = req.body.diet;
  const takeExercise = req.body.takeExercise;
  const airconditioning = req.body.airconditioning;
  const heating = req.body.heating;
  const clean = req.body.clean;
  const camera = req.body.camera;
  pool.query(updateGeneral, [name, introduction, price, id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      pool.query(
        updateHotelService,
        [diet, takeExercise, airconditioning, heating, clean, camera, id],
        (err, res1) => {
          if (err) {
            res.status(500).json({
              message: err.message,
            });
          } else {
            res.status(200).json({
              message: "Updated hotel service successfully",
            });
          }
        }
      );
    }
  });
};
const deleteServiceById = (req, res, next) => {
  const id = req.params.id;
  pool.query(deleteService, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else
      res.status(200).json({
        message: "Deleted service successfully",
      });
  });
};

const getAHotel = (req, res, next) => {
  const id = req.params.id;
  pool.query(getDetailHotel, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else res.status(200).json(result.rows);
  });
};

const getAHealth = (req, res, next) => {
  const id = req.params.id;
  pool.query(getDetailHealth, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else res.status(200).json(result.rows);
  });
};

const getASalon = (req, res, next) => {
  const id = req.params.id;
  pool.query(getDetailSalon, [id], (err, result) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else res.status(200).json(result.rows);
  });
};

module.exports = {
  getAllDataServices,
  createNewService,
  createHealthService,
  createSalonService,
  createHotelService,
  deleteServiceById,
  updateHealth,
  updateSalon,
  updateHotel,
  updateServiceById,
  getServiceById,
  getHealth,
  getSalon,
  getHotel,
  getAHealth,
  getAHotel,
  getASalon,
};
