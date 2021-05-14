const controller = require('../controllers/class.controller.js');

module.exports = function(app){

    app.post('/api/v1/class/create', controller.create);
}
