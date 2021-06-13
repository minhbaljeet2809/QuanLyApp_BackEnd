const controller = require('../controllers/news.controller');
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/v1/news/getAll', controller.findAll);
    app.get('/api/v1/news/getById/:id/', controller.findOneNews);


    app.post('/api/v1/news/create', controller.createNews);
}