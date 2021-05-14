const controller = require('../controllers/news.controller');
module.exports = function (app) {

    app.get('/api/v1/news/getAll', controller.findByTitleNews);
    app.get('/api/v1/news/getById/:id/', controller.findOneNews);
    
    app.get('/api/v1/image/getById/:id/'. controller.findOneImage);

    app.post('/api/v1/news/create', controller.createNews);
    app.post('/api/v1/create/image', controller.createImage);
}