const db = require("../models");
const Op = db.Op;
const News = db.news;
const Image = db.image;

exports.createNews = (req, res) =>{
    const data = req.body;
    const news = {
        title: data.title,
        subTitle: data.subTitle,
        idImageUrl: data.idImageUrl,
        content: data.content,
        type: data.type,
        status: data.status,
        description: data.description,
    };

    News.create(news)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Tutorial."
        });
    });
}

exports.updateNews = (req, res) => {
    const id = req.params.id;

    News.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id,
            });
        });
};

exports.findOneNews = (req, res) => {
    const id = req.params.id;

    News.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id,
            });
        });
};

exports.findByTitleNews = (req, res) => {
    const title = req.params.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    News.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials.",
            });
        });
};

exports.deleteNews = (req, res) => {
    const id = req.params.id;

    News.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id,
            });
        });
};

// Image Controller // Image Controller // Image Controller // Image Controller 
// Image Controller // Image Controller // Image Controller // Image Controller 
exports.createImage = (req, res) =>{
    const data = req.body;
    const image = {
        url: data.url,
    };
    Image.create(image)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Tutorial."
        });
    });
}

exports.updateImage = (req, res) => {
    const id = req.params.id;

    Image.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id,
            });
        });
};

exports.findOneImage = (req, res) => {
    const id = req.params.id;

    Image.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id,
            });
        });
};

exports.findAllImage = (req, res) => {
    const title = req.params.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Image.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials.",
            });
        });
};

exports.deleteImage = (req, res) => {
    const id = req.params.id;

    Image.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id,
            });
        });
};