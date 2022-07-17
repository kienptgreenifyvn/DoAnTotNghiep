const db = require("../models");
const Sinhvien = db.sinhvien;

exports.nopdoan = (req, res) => {
  const sinhvien = req.session.sinhvien;
  const k = new Date(sinhvien.namsinh).getDate();
  console.log(k);
  res.status(200).render("nopdoan.ejs", { sinhvien, k });
};
exports.capnhat_doan = async (req, res) => {
  const sinhvien = req.session.sinhvien;
  await Sinhvien.update(
    {
      IDsinhvien: req.body.IDsinhvien,
      tensinhvien: req.body.tensinhvien,
      gioitinh: req.body.gioitinh,
      namsinh: req.body.namsinh,
      quequan: req.body.quequan,
      sodienthoai: req.body.sodienthoai,
      sourcecode: req.file.originalname,
      khoadaotao: req.body.khoadaotao,
      hedaotao: req.body.hedaotao,
      bacdaotao: req.body.bacdaotao,
      id: req.body.id,
      IDdetai: req.body.IDdetai,
      IDlop: req.body.IDlop,
      IDchude: req.body.IDchude,
      IDgiangvien: req.body.IDgiangvien,
    },
    {
      where: {
        IDsinhvien: sinhvien.IDsinhvien,
      },
    }
  )
    .then((mess) => {
      res.status(200).redirect("../../sinhvien/nopdoan");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
