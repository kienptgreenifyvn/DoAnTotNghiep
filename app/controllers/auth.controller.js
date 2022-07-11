const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

exports.Dangnhap = (req, res) => {
  res.render("dangnhap.ejs");
};
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existedUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!existedUser) {
      return res.status(404).send({ message: "User Not found." });
    }

    let user = {
      id: existedUser.id,
      role: existedUser.role,
      email: existedUser.email,
    };

    var token = jwt.sign(
      { id: existedUser.id, role: existedUser.role, email: existedUser.email },
      config.secret,
      {
        expiresIn: 86400, // 24 hours
      }
    );
    localStorage.setItem("token", token);

    switch (user.role) {
      case "admin":
        res.status(200).redirect("../../../quanly");
        break;
      case "sinhvien":
        res.status(200).redirect("../../../sinhvien");
        break;
      case "giangvien":
        res.status(200).redirect("../../../giangvien");
        break;

      default:
        return res.status(404).json({
          success: false,
          message: `Thông tin đăng nhập không đúng`,
        });
    }
  } catch (err) {
    // logger.error(`[login] ${err.message}`);
    return res.send(err.message);
  }
};
