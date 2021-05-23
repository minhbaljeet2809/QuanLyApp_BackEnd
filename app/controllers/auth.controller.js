const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Student = db.student;

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

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      let token = jwt.sign({ id: user.id }, config.auth.secret, {
        expiresIn: 86400 // 24 hours
      });

      if (user.role == 'student') {
        Student.findAll({ where: { idUser: user.id } })
          .then((data) => {
            res.status(200).send({
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.role,
              accessToken: token,
              idStudent: data[0].id,
              nameStudent: data[0].name,
              birthday: data[0].birthday,
              address: data[0].address,
              phone: data[0].phone,
              code: data[0].code,
              email: data[0].email,
              idClass: data[0].idClass,
              majors: data[0].majors,
              schoolYear: data[0].schoolYear,
              image: data[0].image
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Không tìm thấy thông tin.",
            });
          });
      }
      // else {
      //   res.status(200).send({
      //     id: user.id,
      //     username: user.username,
      //     email: user.email,
      //     role: user.role,
      //     accessToken: token,
      //   });
      // }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
