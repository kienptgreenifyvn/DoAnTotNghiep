const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
const Giangvien = db.giangvien;
const Sinhvien = db.sinhvien;
const Op = db.Sequelize.Op;

exports.danhsachsinhviendangky = (req, res) => {
  const giangvien = req.session.giangvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM giangviens  inner join sinhviens on giangviens."IDgiangvien" = sinhviens."IDgiangvien" inner join detais on sinhviens."IDdetai" = detais."IDdetai" inner join users on sinhviens."id" = users."id" inner join lops on sinhviens."IDlop" = lops."IDlop" where giangviens."IDgiangvien" = ${giangvien.IDgiangvien} and sinhviens."isActive" = true `,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var ds_sinhviendangky = result;
          pool_db.connect(function (err, client, done) {
            if (err) {
              return console.error("error", err);
            }
            client.query(`SELECT * FROM chudes`, function (err, result) {
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
                  client.query(`SELECT * FROM lops`, function (err, result) {
                    done();

                    if (err) {
                      res.end();
                      return console.error("error running query", err);
                    } else {
                      var lop = result;
                      res.render("./dssinhviendangky.ejs", {
                        ds_sinhviendangky: ds_sinhviendangky,
                        chude: chude,
                        lop: lop,
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

exports.loc_danhsachsinhviendangky = (req, res) => {
  const giangvien = req.session.giangvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM giangviens  inner join sinhviens on giangviens."IDgiangvien" = sinhviens."IDgiangvien" inner join detais on sinhviens."IDdetai" = detais."IDdetai" inner join users on sinhviens."id" = users."id" inner join lops on sinhviens."IDlop" = lops."IDlop" where giangviens."IDgiangvien" = ${
        giangvien.IDgiangvien
      } and sinhviens."isActive" = true and 1 = 1 ${
        req.body.IDchude != ""
          ? ` and detais."IDchude" = ${req.body.IDchude}`
          : ""
      } ${
        req.body.IDlop != "" ? ` and sinhviens."IDlop" = ${req.body.IDlop}` : ""
      }`,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var ds_sinhviendangky = result;
          pool_db.connect(function (err, client, done) {
            if (err) {
              return console.error("error", err);
            }
            client.query(`SELECT * FROM chudes`, function (err, result) {
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
                  client.query(`SELECT * FROM lops`, function (err, result) {
                    done();

                    if (err) {
                      res.end();
                      return console.error("error running query", err);
                    } else {
                      var lop = result;
                      res.render("./dssinhviendangky.ejs", {
                        ds_sinhviendangky: ds_sinhviendangky,
                        chude: chude,
                        lop: lop,
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

exports.chapnhan = async (req, res) => {
  await Sinhvien.update(
    {
      isBook: true,
      isActive: false,
    },
    {
      where: {
        IDsinhvien: req.body.IDsinhvien,
      },
    }
  )
    .then(() => {
      res.status(200).redirect("../../giangvien/dssinhviendangky");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.tuchoi = async (req, res) => {
  await Sinhvien.update(
    {
      IDdetai: null,
      IDgiangvien: null,
      isActive: false,
      isBook: false,
    },
    {
      where: {
        IDsinhvien: req.body.IDsinhvien,
      },
    }
  )
    .then(() => {
      res.status(200).redirect("../../giangvien/dssinhviendangky");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.quanlyhuongdan = (req, res) => {
  const giangvien = req.session.giangvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM giangviens inner join donvis on giangviens."IDdonvi" = donvis."IDdonvi" inner join sinhviens on giangviens."IDgiangvien" = sinhviens."IDgiangvien" inner join detais on sinhviens."IDdetai" = detais."IDdetai" inner join users on sinhviens."id" = users."id" inner join lops on sinhviens."IDlop" = lops."IDlop" inner join chudes on detais."IDchude" = chudes."IDchude" where giangviens."IDgiangvien" = ${giangvien.IDgiangvien} and sinhviens."isBook" = true `,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var huongdan = result;
          pool_db.connect(function (err, client, done) {
            if (err) {
              return console.error("error", err);
            }
            client.query(
              `SELECT * FROM detais where detais."IDgiangvien" = ${giangvien.IDgiangvien} `,
              function (err, result) {
                done();

                if (err) {
                  res.end();
                  return console.error("error running query", err);
                } else {
                  var detai = result;
                  res.render("./quanlyhuongdan.ejs", {
                    huongdan: huongdan,
                    detai: detai,
                  });
                }
              }
            );
          });
        }
      }
    );
  });
};

exports.loc_quanlyhuongdan = (req, res) => {
  const giangvien = req.session.giangvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM giangviens inner join donvis on giangviens."IDdonvi" = donvis."IDdonvi" inner join sinhviens on giangviens."IDgiangvien" = sinhviens."IDgiangvien" inner join detais on sinhviens."IDdetai" = detais."IDdetai" inner join users on sinhviens."id" = users."id" inner join lops on sinhviens."IDlop" = lops."IDlop" inner join chudes on detais."IDchude" = chudes."IDchude" where giangviens."IDgiangvien" = ${
        giangvien.IDgiangvien
      } and sinhviens."isBook" = true and 1 = 1 ${
        req.body.IDdetai != ""
          ? ` and detais."IDdetai" = ${req.body.IDdetai}`
          : ""
      } `,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var huongdan = result;
          pool_db.connect(function (err, client, done) {
            if (err) {
              return console.error("error", err);
            }
            client.query(
              `SELECT * FROM detais where detais."IDgiangvien" = ${giangvien.IDgiangvien} `,
              function (err, result) {
                done();

                if (err) {
                  res.end();
                  return console.error("error running query", err);
                } else {
                  var detai = result;
                  res.render("./quanlyhuongdan.ejs", {
                    huongdan: huongdan,
                    detai: detai,
                  });
                }
              }
            );
          });
        }
      }
    );
  });
};

exports.quanlydoanhuongdan = (req, res) => {
  const giangvien = req.session.giangvien;
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM detais inner join chudes on detais."IDchude" = chudes."IDchude" inner join sinhviens on detais."IDdetai" = sinhviens."IDsinhvien" inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien" inner join donvis on donvis."IDdonvi" = giangviens."IDdonvi" where giangviens."IDgiangvien" = ${giangvien.IDgiangvien} and detais."isActive" = true `,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var huongdan = result;
          pool_db.connect(function (err, client, done) {
            if (err) {
              return console.error("error", err);
            }
            client.query(
              `SELECT * FROM detais where detais."IDgiangvien" = ${giangvien.IDgiangvien} `,
              function (err, result) {
                done();

                if (err) {
                  res.end();
                  return console.error("error running query", err);
                } else {
                  var detai = result;
                  res.render("./doanhuongdan.ejs", {
                    huongdan: huongdan,
                    detai: detai,
                  });
                }
              }
            );
          });
        }
      }
    );
  });
};
