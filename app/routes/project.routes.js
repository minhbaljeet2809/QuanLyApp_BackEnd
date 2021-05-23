const controller = require('../controllers/project.controller');

module.exports = function (app) {

    app.get('/api/v1/project/getAll', controller.findAllProject);
    app.get('/api/v1/project/getId/:id', controller.findOneProject);
    app.get('/api/v1/projectLog/get/:idProject/:stage', controller.findProjectLog);
    


    app.post('/api/v1/project/create', controller.createProject);
    app.post('/api/v1/projectLog/create', controller.createProjectLog);
    app.post('/api/v1/projectStageLog/create', controller.createProjectStageLog);
    
}