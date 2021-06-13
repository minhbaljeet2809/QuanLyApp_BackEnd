const db = require("../models");
const bcrypt = require("bcryptjs");
const Op = db.Op;
const Student = db.student;
const User = db.user;
const Project = db.project;

exports.create = async (req, res) => {
    const data = req.body;
    const user = {
        username: data.code,
        password: bcrypt.hashSync(data.code, 8),
        email: data.email,
        role: "student",
    }
    // try {
    const createUser = await User.create(user);
    if (createUser.id) {
        const student = {
            name: data.name,
            idUser: createUser.id,
            birthday: data.birthday,
            code: data.code,
            address: data.address,
            phone: data.phone,
            email: data.email,
            idClass: data.idClass,
            majors: data.majors,
            schoolYear: data.schoolYear,
            image: data.image,
        };
        const createStudent = await Student.create(student);
        if (createStudent.id) {
            res.status(200).send(createStudent);
        }
    }
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

exports.findAll = async (req, res) => {
    const listStudent = await Student.findAll();
    res.status(200).send(listStudent);
}

exports.findOne = async (req, res) => {
    const id = req.params.id;
    const student = await Student.findByPk(id);
    if (!student.id) return res.status(405).send({
        message: "Không tìm thấy thông tin với id=" + id,
    });
    const project = await Project.findAll({ where: { idStudent: id } });
    let regis = false;
    let idProject = "";
    if (project.length != 0) {
        regis = true;
        idProject = project[0].id;
    }
    const result = {
        ...student.dataValues,
        regis: regis,
        idProject: idProject
    }
    res.status(200).send(result);
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

exports.delete = async (req, res) => {
    const id = req.params.id;
    const student = await Student.findByPk(id);
    if (!student.id) return res.status(405).send({
        message: "Không tìm thấy thông tin với id=" + id,
    });

    const deleteStudent = await Student.destroy({where: { id: student.id }});
    if(!deleteStudent){
        res.status(500).send({
            message: "có lỗi"
        })
    }
    const deleteUser = await User.destroy({where: { id: student.idUser }});
    if(!deleteUser){
        res.status(500).send({
            message: "có lỗi"
        })
    }
    res.status(200).send({
        message: "xoá sinh viên thành công"
    });
};

exports.regisProject = async (req, res) => {
    const data = req.body;
    const project = await Project.findByPk(data.idProject);
    if (project && project.state) return res.status(405).send({ message: "Đề tài đã có sinh viên đăng ký" });
    const regisProject = await project.update({ idStudent: data.idStudent, nameStudent: data.nameStudent, state: true });
    if (!regisProject) return res.status(500).send({ message: "đăng ký đề tài thất bại" });
    res.status(200).send({ message: "đăng ký đề tài thành công" });
}