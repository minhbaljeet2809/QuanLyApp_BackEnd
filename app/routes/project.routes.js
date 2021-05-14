const controller = require('../controllers/project.controller');

module.exports = function (app) {
    app.post('/api/v1/create/project', controller.create);
}