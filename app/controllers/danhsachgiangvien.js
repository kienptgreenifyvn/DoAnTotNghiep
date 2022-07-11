const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
const Giangvien = db.giangvien;
const Op = db.Sequelize.Op;

exports.danhsach_giangvien = (req, res) => {
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM giangviens  inner join donvis on giangviens."IDdonvi" = donvis."IDdonvi" inner join users on giangviens."id" = users."id"`,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var ds_giangvien = result;
          pool_db.connect(function (err, client, done) {
            if (err) {
              return console.error("error", err);
            }
            client.query(`SELECT * FROM donvis`, function (err, result) {
              done();

              if (err) {
                res.end();
                return console.error("error running query", err);
              } else {
                var donvi = result;
                res.render("./danhsachgiangvien.ejs", {
                  ds_giangvien: ds_giangvien,
                  donvi: donvi,
                });
              }
            });
          });
        }
      }
    );
  });
};
exports.loc_giangvien = (req, res) => {
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM giangviens  inner join donvis on giangviens."IDdonvi" = donvis."IDdonvi" inner join users on giangviens."id" = users."id" where 1 = 1 ${
        req.body.IDdonvi != ""
          ? ` and giangviens."IDdonvi" = ${req.body.IDdonvi}`
          : ""
      }`,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var ds_giangvien = result;
          pool_db.connect(function (err, client, done) {
            if (err) {
              return console.error("error", err);
            }
            client.query(`SELECT * FROM donvis`, function (err, result) {
              done();

              if (err) {
                res.end();
                return console.error("error running query", err);
              } else {
                var donvi = result;
                res.render("./danhsachgiangvien.ejs", {
                  ds_giangvien: ds_giangvien,
                  donvi: donvi,
                });
              }
            });
          });
        }
      }
    );
  });
};

// exports.them_giangvien = (req, res) => {
//   Giangvien.create({
//     IDgiangvien: req.body.IDgiangvien,
//     tengiangvien: req.body.tengiangvien,
//     gioitinh: req.body.gioitinh,
//     email: req.body.email,
//     namsinh: req.body.namsinh,
//     sodienthoai: req.body.sodienthoai,
//     diachi: req.body.diachi,
//     hocvi: req.body.hocvi,
//     chucvu: req.body.chucvu,
//     anhgiangvien: req.file.originalname,
//     Khoa: req.body.Khoa,
//     IDdonvi: req.body.IDdonvi,
//   }).then(() => {
//     res.redirect("../giangvien");
//   });
// };

// exports.capnhat_giangvien = async (req, res) => {
//   await Giangvien.update(
//     {
//       IDgiangvien: req.body.IDgiangvien,
//       tengiangvien: req.body.tengiangvien,
//       gioitinh: req.body.gioitinh,
//       email: req.body.email,
//       namsinh: req.body.namsinh,
//       sodienthoai: req.body.sodienthoai,
//       diachi: req.body.diachi,
//       hocvi: req.body.hocvi,
//       chucvu: req.body.chucvu,
//       anhgiangvien: req.body.anhgiangvien,
//       Khoa: req.body.Khoa,
//       IDdonvi: req.body.IDdonvi,
//     },
//     {
//       where: {
//         IDgiangvien: req.params.IDgiangvien,
//       },
//     }
//   )
//     .then(() => {
//       res.redirect("../../../quanly/giangvien");
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message });
//     });
// };

// exports.xoa_giangvien = async (req, res) => {
//   await Giangvien.destroy({
//     where: {
//       IDgiangvien: req.params.IDgiangvien,
//     },
//   })
//     .then(() => {
//       res.redirect("../../../quanly/giangvien");
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message });
//     });
// };
