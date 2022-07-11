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
      `SELECT detais.*,giangviens."tengiangvien",giangviens."IDgiangvien", donvis."tendonvi", donvis."IDdonvi" FROM detais inner join chudes on detais."IDchude" = chudes."IDchude" inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien" inner join donvis on donvis."IDdonvi" = detais."IDdonvi" `,
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
      `SELECT detais.*,giangviens."tengiangvien",giangviens."IDgiangvien", donvis."tendonvi", donvis."IDdonvi" FROM detais inner join chudes on detais."IDchude" = chudes."IDchude" inner join sinhviens on detais."IDdetai" = sinhviens."IDchude" inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien" inner join donvis on donvis."IDdonvi" = detais."IDdonvi"  where 1 = 1 ${
        req.body.IDchude != ""
          ? ` and detais."IDchude" = ${req.body.IDchude}`
          : ""
      } ${
        req.body.IDdonvi != ""
          ? ` and detais."IDdonvi" = ${req.body.IDdonvi}`
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
      res.status(200).redirect("../../sinhvien/dangkydetai");
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

exports.them_dangkytopic = (req, res) => {
  const giangvien = req.session.giangvien;
  console.log(giangvien);
  Detai.create({
    IDdetai: req.body.IDdetai,
    tendetai: req.body.tendetai,
    IDchude: req.body.IDchude,
    IDgiangvien: giangvien.IDgiangvien,
  }).then(() => {
    res.redirect("../../giangvien/dangkytopic");
  });
};
