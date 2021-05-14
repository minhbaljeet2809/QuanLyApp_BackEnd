const controller = require('../controllers/teacher.controller');

module.exports = function (app) {
    app.post('/api/v1/create/teacher', controller.create);
}