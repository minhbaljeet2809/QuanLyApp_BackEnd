const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./app/config/config");
const morgan = require("morgan");

const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan(':method :url :status - :response-time ms'));

// database
const db = require("./app/models");
// db.sequelize.sync({force:true});
// db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hi there, welcome to this tutorial." });
});
app.get("/api/v1", (req, res) => {
    res.json({ message: "day la api version 1" });
});

// api routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/student.routes")(app);
require("./app/routes/teacher.routes")(app);
require('./app/routes/class.routes')(app);
require('./app/routes/news.routes')(app);
require('./app/routes/project.routes')(app);

// set port, listen for requests
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
