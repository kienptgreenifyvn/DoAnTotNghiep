const db = require("../models");
const ChuyenNghanh = db.donvi;
const Op = db.Sequelize.Op;
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");

exports.danhsach_chuyennghanh = (req, res) => {
    ChuyenNghanh.findAll().then((ds_chuyennghanh) => {
    // res.json(ds_khoa);
    res.render("./chuyennghanh.ejs", { DS_chuyennghanh: ds_chuyennghanh });
  });
};

// exports.chitiet_chuyennganh = (req, res) => {
//   ChuyenNganh.findOne({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((ct_khoa) => {
//       res.json(ct_khoa);
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message });
//     });
// };

exports.them_chuyennghanh = (req, res) => {
  ChuyenNghanh.create({
    IDdonvi: req.body.IDdonvi,
    tendonvi: req.body.tendonvi,
    diachi: req.body.diachi,
    sodienthoai: req.body.sodienthoai,
    truongdonvi: req.body.truongdonvi,
  }).then(() => {
    res.redirect("../chuyennghanh");
  });
};

exports.capnhat_chuyennghanh = async (req, res) => {
  await ChuyenNghanh.update(
    {  IDdonvi: req.body.IDdonvi,
        tendonvi: req.body.tendonvi,
        diachi: req.body.diachi,
        sodienthoai: req.body.sodienthoai,
        truongdonvi: req.body.truongdonvi,
    },
    {
      where: {
        IDdonvi: req.params.IDdonvi,
      },
    }
  )
    .then(() => {
      res.redirect("../../../quanly/chuyennghanh");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.xoa_chuyennghanh = async (req, res) => {
  await ChuyenNghanh.destroy({
    where: {
        IDdonvi: req.params.IDdonvi,
    },
  })
    .then(() => {
      res.redirect("../../../quanly/chuyennghanh");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
