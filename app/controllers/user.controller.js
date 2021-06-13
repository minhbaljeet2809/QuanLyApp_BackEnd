const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.user;
const Project = db.project;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.ChangePassword = async (req, res) => {
  const data = req.body;
  try {
    const user = await User.findOne({ where: { id: data.id } });
    if (!user) { return res.status(405).send({ messages: "User k tồn tại" }) }
    let passwordIsValid = bcrypt.compareSync(
      data.oldPassword,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(405).send({
        messages: "mật khẩu cũ sai"
      });
    }

    const updateUser = await User.update({ "password": bcrypt.hashSync(data.newPassword, 8) }, { where: { id: data.id } });
    if (updateUser == 1) {
      return res.status(200).send({ messages: "cập nhật mật khẩu thành công" });
    }
    res.status(405).send({ messages: "cập nhật mật khẩu không thành công" });
  } catch (err) {
    res.status(405).send({ messages: err });
  }
}
