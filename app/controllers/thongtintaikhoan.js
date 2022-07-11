const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
const Sinhvien = db.sinhvien;
const User = db.user;

exports.thongtintaikhoan = (req, res) => {
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

exports.capnhatthongtin = async (req, res) => {
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
