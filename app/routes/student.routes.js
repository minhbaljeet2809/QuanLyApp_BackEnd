const controller = require('../controllers/student.controller');
module.exports = function (app) {

    app.get("/api/v1/student/getAll", controller.findAll);

    app.get("/api/v1/student/get/:id/", controller.findOne);

    app.get("/api/v1/student/findByName/:name", controller.findByName);

    app.post("/api/v1/student/create", controller.create);

    app.post("/api/v1/student/update/:id", controller.update);

    app.post("/api/v1/student/regis", controller.regisProject);

    app.delete("/api/v1/student/delete/:id", controller.delete);
}