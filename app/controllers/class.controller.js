const db = require("../models");
const Op = db.Op;
const Class = db.class;

exports.create = (req, res) => {
    const data = req.body;

    const classes = {
        name: data.name,
    };

    Class.create(classes)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Không thể thạo mới"
            });
        });
}

exports.update = (req, res) => {
    const id = req.params.id;

    Class.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Cập nhật thành công",
                });
            } else {
                res.send({
                    message: `không thể cập nhật với id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "có lỗi khi cập nhật với id=" + id,
            });
        });
};

exports.findAll = (req, res) => {
    Class.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id,
            });
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Class.findByPk(id)
        .then((data) => {
            if(data == null){
                return res.send({
                    message: "không tồn tại"
                })
            }
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id,
            });
        });
};

exports.findByName = (req, res) => {
    const name = req.params.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Class.findAll({ where: condition })
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

exports.findByTeacherName = (req, res) => {
    const teacher = req.params.teacher;
    var condition = teacher ? { teacher: { [Op.like]: `%${teacher}%` } } : null;

    Class.findAll({ where: condition })
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

exports.findByTeacherId = (req, res) => {
    const teacherId = req.params.teacherId;
    var condition = teacherId ? { idTeacher: { [Op.like]: `%${teacherId}%` } } : null;

    Class.findAll({ where: condition })
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

exports.delete = (req, res) => {
    const id = req.params.id;

    Class.destroy({
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
