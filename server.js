const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 8080;

const LoginRoute = require("./api/routes/login");
const PetRoute = require("./api/routes/pet");
const bookDate = require("./api/routes/bookSchedule");
const ServiceRoute = require("./api/routes/serviceList");

app.use(express.json());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "GET, POST, PUT, PATCH, DELETE");
    res.status(200).json({});
  }
  next();
});

app.use("/pets", PetRoute);
app.use("/services", ServiceRoute);
app.use("/bookDate", bookDate);
app.use("/", LoginRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
