const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
const Detai = db.detai;
const Op = db.Sequelize.Op;
const Sinhvien = db.sinhvien;

exports.topic_gv = (req, res) => {
  const sinhvien = req.session.sinhvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT detais.*,giangviens."tengiangvien",giangviens."IDgiangvien", donvis."tendonvi", donvis."IDdonvi" FROM detais inner join chudes on detais."IDchude" = chudes."IDchude" inner join sinhviens on detais."IDdetai" = sinhviens."IDsinhvien" inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien" inner join donvis on donvis."IDdonvi" = giangviens."IDdonvi" where detais."isActive" =false `,
      function (err, result) {
        done();
        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var ds_gv = result;
          pool_db.connect(function (err, client, done) {
            if (err) {
              return console.error("error", err);
            }
            client.query(`SELECT * FROM chudes `, function (err, result) {
              done();

              if (err) {
                res.end();
                return console.error("error running query", err);
              } else {
                var chude = result;
                pool_db.connect(function (err, client, done) {
                  if (err) {
                    return console.error("error", err);
                  }
                  client.query(`SELECT * FROM donvis `, function (err, result) {
                    done();

                    if (err) {
                      res.end();
                      return console.error("error running query", err);
                    } else {
                      var donvi = result;
                      res.render("./dangkydetai.ejs", {
                        ds_gv: ds_gv,
                        chude: chude,
                        donvi: donvi,
                        sinhvien: sinhvien,
                      });
                    }
                  });
                });
              }
            });
          });
        }
      }
    );
  });
};

exports.loc_topic_gv = (req, res) => {
  const sinhvien = req.session.sinhvien;

  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT detais.*,giangviens."tengiangvien",giangviens."IDgiangvien", donvis."tendonvi", donvis."IDdonvi" FROM giangviens  inner join detais on giangviens."IDgiangvien" = detais."IDgiangvien" inner join donvis on donvis."IDdonvi" = giangviens."IDdonvi"  where  detais."isActive" = false and 1 = 1 ${
        req.body.IDchude != ""
          ? ` and detais."IDchude" = ${req.body.IDchude}`
          : ""
      } ${
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
          var ds_gv = result;
          pool_db.connect(function (err, client, done) {
            if (err) {
              return console.error("error", err);
            }
            client.query(`SELECT * FROM chudes `, function (err, result) {
              done();

              if (err) {
                res.end();
                return console.error("error running query", err);
              } else {
                var chude = result;
                pool_db.connect(function (err, client, done) {
                  if (err) {
                    return console.error("error", err);
                  }
                  client.query(`SELECT * FROM donvis `, function (err, result) {
                    done();

                    if (err) {
                      res.end();
                      return console.error("error running query", err);
                    } else {
                      var donvi = result;
                      res.render("./dangkydetai.ejs", {
                        ds_gv: ds_gv,
                        chude: chude,
                        donvi: donvi,
                        sinhvien: sinhvien,
                      });
                    }
                  });
                });
              }
            });
          });
        }
      }
    );
  });
};

exports.dangky_doan = async (req, res) => {
  const sinhvien = req.session.sinhvien;
  await Sinhvien.update(
    {
      IDdetai: req.body.IDdetai,
      IDgiangvien: req.body.IDgiangvien,
      isActive: true,
    },
    {
      where: {
        IDsinhvien: sinhvien.IDsinhvien,
      },
    }
  )
    .then(() => {
      res.json({ message: "Bạn đã đăng ký thành công!" });
      //res.status(200).redirect("../../sinhvien/dangkydetai");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.dangky_topic = (req, res) => {
  const giangvien = req.session.giangvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT detais."tendetai",giangviens.*, chudes."tenchude" FROM detais inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien"  inner join chudes on detais."IDchude" = chudes."IDchude" where giangviens."IDgiangvien" = ${giangvien.IDgiangvien} `,
      function (err, result) {
        done();
        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var ds_gv = result;
          pool_db.connect(function (err, client, done) {
            if (err) {
              return console.error("error", err);
            }
            client.query(`SELECT * FROM chudes `, function (err, result) {
              done();

              if (err) {
                res.end();
                return console.error("error running query", err);
              } else {
                var chude = result;
                res.render("./dangkytopic_gv.ejs", {
                  ds_gv: ds_gv,
                  chude: chude,
                  giangvien,
                });
              }
            });
          });
        }
      }
    );
  });
};

exports.them_dangkytopic = async (req, res) => {
  const giangvien = req.session.giangvien;
  const Iddetai = await Detai.findAll();
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT detais."IDdetai" FROM detais `,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          const detai = result.rows.map((e) => {
            return e.IDdetai;
          });
          const max = Math.max.apply(Math, detai);
          Detai.create({
            IDdetai: max + 1,
            tendetai: req.body.tendetai,
            IDchude: req.body.IDchude,
            isActive: false,
            IDgiangvien: giangvien.IDgiangvien,
          }).then(() => {
            res.json({ message: "Thêm đề tài thành công!" });
            // res.redirect("../../giangvien/dangkytopic");
          });
        }
      }
    );
  });
};
