const controller = require('../controllers/project.controller');

module.exports = function (app) {

    app.get('/api/v1/project/getAll', controller.findAllProject);
    app.get('/api/v1/project/getId/:id', controller.findOneProject);
    app.get('/api/v1/projectProgress/get/:idProject/:stage', controller.findProjectProgress);
    app.get('/api/v1/projectProgressLog/:idProjectProgress', controller.findAllProjectProgressLog);
    app.get('/api/v1/projectProgressLog/get/:idProjectProgressLog', controller.findOneProjectProgressLog);
    app.get('/api/v1/projectProgress/getAll/:idProject/:stage', controller.getProjectProgress);
    app.get('/api/v1/project/tkProject' , controller.tkProject);
    app.get('/api/v1/project/tkStudent' , controller.tkStudent);
    app.get('/api/v1/project/tkProgress/:stage', controller.tkProjectProgress);

    app.post('/api/v1/project/create', controller.createProject);
    app.post('/api/v1/projectProgress/create', controller.createProjectProgress);
    app.post('/api/v1/projectProgressLog/create', controller.createProjectProgressLog);
    app.post('/api/v1/projectProgress/update/:idProjectProgressLog', controller.updateProjectProgressLog);
    app.delete('/api/v1/project/delete/:id', controller.deleteProject);
}