const controller = require('../controllers/class.controller.js');

module.exports = function(app){

    app.get('/api/v1/class/getAll', controller.findAll);

    app.get('/api/v1/class/getById/:id', controller.findOne);

    app.get('/api/v1/class/getByNam/:name', controller.findByName);

    app.post('/api/v1/class/create', controller.create);
    
    app.post('/api/v1/class/update' , controller.update);
}
