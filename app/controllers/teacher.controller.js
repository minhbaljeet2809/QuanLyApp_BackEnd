const e = require("express");
const db = require("../models");
const Op = db.Op;
const Teacher = db.teacher;
const Project = db.project;

exports.create = (req, res) => {
    const data = req.body;
    const teacher = {
        name: data.name,
        level: data.level,
        birthday: data.birthday,
        address: data.address,
        phone: data.phone,
        email: data.email,
        image: data.image,
        workspace: data.workspace,
        description: data.description,
    };
    Teacher.create(teacher)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Có lỗi xảy ra"
            });
        });
}

exports.update = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    console.log(data);
    try {
        const updateTeacher = await Teacher.update(data, { where: { id: id } });
        console.log(updateTeacher);
        if (updateTeacher == 1) {
            res.send({
                message: "Cập nhật thành công",
            });
        } else {
            res.status(501).send({
                message: `Không thể cập nhật với id=${id}!`,
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "có lỗi cập nhật với id=" + id,
        });
    }
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Teacher.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "không thể tìm kiếm với id=" + id,
            });
        });
};

exports.findAll = (req, res) => {

    Teacher.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || " không thể tìm kiếm.",
            });
        });
};

exports.findByName = (req, res) => {
    const name = req.params.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Teacher.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "không thể tìm kiếm",
            });
        });
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    const teacher = await Teacher.findByPk(id);
    if (!teacher.id) {
        return res.status(404).send({ message: "không tồn tại giảng viên" });
    }
    const deleteTeacher = await Teacher.destroy({where: { id: teacher.id }});
    if(!deleteTeacher){
        return res.status(500).send({ message: "xoá thất bại"});
    }
    res.status(200).send({ message: "Xoá thành công" });
};

exports.checkTeacher = async (req, res) => {
    const id = req.params.id;

    const teacher = await Teacher.findByPk(id);
    if (!teacher.id) {
        return res.status(404).send({ message: "không tồn tại giảng viên" });
    }
    const listProject = await Project.findAll({ where: { idTeacher: teacher.id } });
    if(listProject && listProject.length > 0){
        return res.status(205).send({ message: "giảng viên đang hướng dẫn dề tài" });
    }
    return res.status(200).send({ message: "giảng viên không hướng dẫn dề tài" });
}