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
} = require("../queries/serviceListQuery");

const getAllDataServices = (req, res, next) => {
  let dataService = [];
  let service1 = [];
  let service2 = [];
  let service3 = [];
  pool.query(getAllServices, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      dataService = results.rows;
      // console.log(dataService);
      pool.query(getHealthService, (err, res1) => {
        if (err) {
          res.status(500).json({
            message: err.message,
          });
        } else {
          service1 = res1.rows;
          // res.status(200).json(service1);
          pool.query(getSalonService, (err, res2) => {
            if (err) {
              res.status(500).json({
                message: err.message,
              });
            } else {
              service2 = res2.rows;
              pool.query(getHotelService, (err, res3) => {
                if (err) {
                  res.status(500).json({
                    message: err.message,
                  });
                } else {
                  service3 = res3.rows;
                  for (let data of dataService) {
                    if (data.id === 1) {
                      dataService[0] = {
                        ...dataService[0],
                        data: service1,
                      };
                    } else if (data.id === 2) {
                      dataService[1] = {
                        ...dataService[1],
                        data: service2,
                      };
                    } else {
                      dataService[2] = {
                        ...dataService[2],
                        data: service3,
                      };
                    }
                  }
                  res.status(200).json(dataService);
                }
              });
            }
          });
        }
      });
    }
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
};
