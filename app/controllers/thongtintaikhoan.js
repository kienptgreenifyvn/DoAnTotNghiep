const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
const Sinhvien = db.sinhvien;
const Giangvien = db.giangvien;
const User = db.user;

exports.thongtintaikhoan_sv = (req, res) => {
  const sinhvien = req.session.sinhvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM sinhviens inner join users on sinhviens."id"=users."id" where sinhviens."IDsinhvien" =${sinhvien.IDsinhvien}  `,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var thongtin = result;
          res.render("./thongtintaikhoan.ejs", {
            thongtin: thongtin.rows[0],
            sinhvien,
          });
        }
      }
    );
  });
};

exports.capnhatthongtin_sv = async (req, res) => {
  try {
    const sinhvien = req.session.sinhvien;
    const { email, IDsinhvien, tensinhvien, sodienthoai, kynang, diemtichluy } =
      req.body;

    const newUser = {
      email: email,
    };
    await User.update(newUser, {
      where: {
        id: sinhvien.id,
      },
    });

    const newStudent = {
      IDsinhvien: IDsinhvien,
      tensinhvien: tensinhvien,
      sodienthoai: sodienthoai,
      kynang: kynang,
      diemtichluy: diemtichluy,
    };

    await Sinhvien.update(newStudent, {
      where: {
        IDsinhvien: IDsinhvien,
      },
    });

    return res.status(200).redirect("../../sinhvien/thongtintaikhoan");
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `${err.message}`,
    });
  }
};

exports.thongtintaikhoan_gv = (req, res) => {
  const giangvien = req.session.giangvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM giangviens inner join users on giangviens."id"=users."id" where giangviens."IDgiangvien" =${giangvien.IDgiangvien}  `,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var thongtin = result;
          res.render("./thongtintaikhoan_gv.ejs", {
            thongtin: thongtin.rows[0],
            giangvien,
          });
        }
      }
    );
  });
};

exports.capnhatthongtin_gv = async (req, res) => {
  try {
    const giangvien = req.session.giangvien;
    const {
      email,
      IDgiangvien,
      tengiangvien,
      sodienthoai,
      anhgiangvien,
      huongnghiencuu,
      diachi,
    } = req.body;

    const newUser = {
      email: email,
    };
    await User.update(newUser, {
      where: {
        id: giangvien.id,
      },
    });

    const newTutor = {
      IDgiangvien: IDgiangvien,
      tengiangvien: tengiangvien,
      sodienthoai: sodienthoai,
      anhgiangvien: anhgiangvien,
      huongnghiencuu: huongnghiencuu,
      diachi: diachi,
    };

    await Giangvien.update(newTutor, {
      where: {
        IDgiangvien: IDgiangvien,
      },
    });

    return res.status(200).redirect("../../giangvien/thongtintaikhoan");
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `${err.message}`,
    });
  }
};
