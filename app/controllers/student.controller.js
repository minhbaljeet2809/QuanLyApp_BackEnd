const db = require("../models");
const Op = db.Op;
const Student = db.student;

exports.create = (req, res) => {
    const data = req.body;
    const student = {
        name: data.name,
        birthday: data.birthday,
        code: data.code,
        address: data.address,
        phone: data.phone,
        code: data.code,
        email: data.email,
        idClass: data.idClass,
        majors: data.majors,
        shoolYear: data.shoolYear,
        image: data.image,
    };
    Student.create(student)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Tạo mới không thành công",
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Student.update(req.body, {
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
                message: "Lỗi cập nhật với id=" + id,
            });
        });
};

exports.findAll = (req, res) => {
    Student.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Không tìm thấy thông tin",
            });
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Student.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Không tìm thấy thông tin với id=" + id,
            });
        });
};

exports.findByName = (req, res) => {
    const name = req.params.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Student.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Không tìm thấy thông tin.",
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Student.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Xoá thành công!",
                });
            } else {
                res.send({
                    message: `không thể xoá với id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id,
            });
        });
};
