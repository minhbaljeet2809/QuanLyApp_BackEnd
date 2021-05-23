const controller = require('../controllers/teacher.controller');

module.exports = function (app) {
    app.get('/api/v1/teacher/getAll', controller.findAll);

    app.get('/api/v1/teacher/getById/:id', controller.findOne);

    app.post('/api/v1/teacher/create', controller.create);

    app.post('/api/v1/teacher/update/:id', controller.update);
}