const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
const User = db.user;

exports.caidatsinhvien = (req, res) => {
  res.render("./caidatsinhvien.ejs");
};

exports.capnhatmatkhau = async (req, res) => {
  try {
    const sinhvien = req.session.sinhvien;
    const { password } = req.body;

    const newUser = {
      password: password,
    };
    await User.update(newUser, {
      where: {
        id: sinhvien.id,
      },
    });
    return res.status(200).redirect("../../sinhvien/caidat");
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `${err.message}`,
    });
  }
};
