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
                err.message || "Có lỗi khi tạo tin tức."
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
                    message: "Cập nhật tin tức thành công",
                });
            } else {
                res.send({
                    message: `không thể cập nhật tin tức với id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Có lỗi khi cập nhật với id=" + id,
            });
        });
};

exports.findAll = ( req, res) => {
    News.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "có lỗi.",
            });
        });
}

exports.findOneNews = (req, res) => {
    const id = req.params.id;

    News.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "không tìm thấy tin tức với id=" + id,
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
                    err.message || "không tìm thấy tin tức",
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
                    message: "Xoá tin tức thành công",
                });
            } else {
                res.send({
                    message: `Không thể xoá tin tức với id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id,
            });
        });
};
