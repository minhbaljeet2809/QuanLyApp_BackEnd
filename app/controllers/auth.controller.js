const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Student = db.student;
const Project = db.project;

const Op = db.Op;

exports.signup = (req, res) => {
  // Save user to database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: !req.body.role ? "" : req.body.role
  })
    .then(data => {
      res.send({ message: "Tạo User thành công" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = async (req, res) => {
  const data = req.body;

  try {
    const user = await User.findOne({ where: { username: data.username } });
    if (!user) return res.status(404).send({ message: "User Not found." });
    let passwordIsValid = bcrypt.compareSync(
      data.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Sai mật khẩu"
      });
    }
    let token = jwt.sign({ id: user.id }, config.auth.secret, {
      expiresIn: 86400 // 24 hours
    });
    if (user.role == 'student') {
      const student = await Student.findOne({ where: { idUser: user.id } });
      if (!student) return res.status(404).send({ message: "student Not found." });
      const project = await Project.findOne({ where: { idStudent: student.id } });
      let idProject = "";
      if (project) {
        idProject = project.id;
      }
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        accessToken: token,
        idStudent: student.id,
        nameStudent: student.name,
        birthday: student.birthday,
        address: student.address,
        phone: student.phone,
        code: student.code,
        email: student.email,
        idClass: student.idClass,
        majors: student.majors,
        schoolYear: student.schoolYear,
        image: student.image,
        idProject: idProject
      });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }

};
