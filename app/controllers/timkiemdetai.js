const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
const Detai = db.detai;
const Op = db.Sequelize.Op;

exports.danhsach_detai_sv = (req, res) => {
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM detais inner join chudes on detais."IDchude" = chudes."IDchude" inner join sinhviens on detais."IDdetai" = sinhviens."IDchude" inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien" inner join donvis on donvis."IDdonvi" = detais."IDdonvi" `,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var ds_detai = result;
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
                      res.render("./timkiemdetai.ejs", {
                        ds_detai: ds_detai,
                        chude: chude,
                        donvi: donvi,
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

exports.loc_detai = (req, res) => {
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM detais inner join chudes on detais."IDchude" = chudes."IDchude" inner join sinhviens on detais."IDdetai" = sinhviens."IDchude" inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien" inner join donvis on donvis."IDdonvi" = detais."IDdonvi" where 1 = 1 ${
        req.body.IDchude != ""
          ? ` and detais."IDchude" = ${req.body.IDchude}`
          : ""
      } ${
        req.body.IDdonvi != ""
          ? ` and detais."IDdonvi" = ${req.body.IDdonvi}`
          : ""
      } `,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var ds_detai = result;
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
                      res.render("./timkiemdetai.ejs", {
                        ds_detai: ds_detai,
                        chude: chude,
                        donvi: donvi,
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

exports.danhsach_detai_gv = (req, res) => {
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM detais inner join chudes on detais."IDchude" = chudes."IDchude" inner join sinhviens on detais."IDdetai" = sinhviens."IDchude" inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien" inner join donvis on donvis."IDdonvi" = detais."IDdonvi" `,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var ds_detai = result;
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
                res.render("./timkiemdetaigv.ejs", {
                  ds_detai: ds_detai,
                  chude: chude,
                });
              }
            });
          });
        }
      }
    );
  });
};

exports.loc_detaigv = (req, res) => {
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT * FROM detais inner join chudes on detais."IDchude" = chudes."IDchude" inner join sinhviens on detais."IDdetai" = sinhviens."IDchude" inner join giangviens on giangviens."IDgiangvien" = detais."IDgiangvien" inner join donvis on donvis."IDdonvi" = detais."IDdonvi" where 1 = 1 ${
        req.body.IDchude != ""
          ? ` and detais."IDchude" = ${req.body.IDchude}`
          : ""
      } `,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var ds_detai = result;
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
                      res.render("./timkiemdetaigv.ejs", {
                        ds_detai: ds_detai,
                        chude: chude,
                        donvi: donvi,
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
