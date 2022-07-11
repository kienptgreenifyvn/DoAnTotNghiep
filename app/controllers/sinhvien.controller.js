const db = require("../models");
var pool_db = require("../config/crdb.config").pool_db;
const config = require("../config/auth.config");
// const { user } = require("../models");
const Sinhvien = db.sinhvien;
const User = db.user;
const Op = db.Sequelize.Op;

exports.danhsach_sinhvien = (req, res) => {
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    client.query(
      `SELECT sinhviens.* FROM sinhviens inner join lops on sinhviens."IDlop" = lops."IDlop" inner join detais on sinhviens."IDdetai" = detais."IDdetai" inner join chudes on sinhviens."IDchude" = chudes."IDchude" inner join giangviens on sinhviens."IDgiangvien" = giangviens."IDgiangvien"`,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          var ds_sinhvien = result;
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
                pool_db.connect(function (err, client, done) {
                  if (err) {
                    return console.error("error", err);
                  }
                  client.query(`SELECT * FROM detais`, function (err, result) {
                    done();

                    if (err) {
                      res.end();
                      return console.error("error running query", err);
                    } else {
                      var detai = result;
                      pool_db.connect(function (err, client, done) {
                        if (err) {
                          return console.error("error", err);
                        }
                        client.query(
                          `SELECT * FROM chudes`,
                          function (err, result) {
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
                                client.query(
                                  `SELECT * FROM giangviens`,
                                  function (err, result) {
                                    done();

                                    if (err) {
                                      res.end();
                                      return console.error(
                                        "error running query",
                                        err
                                      );
                                    } else {
                                      var giangvien = result;
                                      pool_db.connect(function (
                                        err,
                                        client,
                                        done
                                      ) {
                                        if (err) {
                                          return console.error("error", err);
                                        }
                                        client.query(
                                          `SELECT * FROM sinhviens inner join lops on sinhviens."IDlop" = lops."IDlop" inner join detais on sinhviens."IDdetai" = detais."IDdetai" inner join chudes on sinhviens."IDchude" = chudes."IDchude" inner join giangviens on sinhviens."IDgiangvien" = giangviens."IDgiangvien"`,
                                          function (err, result) {
                                            done();

                                            if (err) {
                                              res.end();
                                              return console.error(
                                                "error running query",
                                                err
                                              );
                                            } else {
                                              var chon_sinhvien = result;
                                              pool_db.connect(function (
                                                err,
                                                client,
                                                done
                                              ) {
                                                if (err) {
                                                  return console.error(
                                                    "error",
                                                    err
                                                  );
                                                }
                                                client.query(
                                                  `SELECT * FROM lops where "IDlop" != ${chon_sinhvien.rows[0].IDlop} `,
                                                  function (err, result) {
                                                    done();

                                                    if (err) {
                                                      res.end();
                                                      return console.error(
                                                        "error running query",
                                                        err
                                                      );
                                                    } else {
                                                      var chon_lop = result;
                                                      pool_db.connect(function (
                                                        err,
                                                        client,
                                                        done
                                                      ) {
                                                        if (err) {
                                                          return console.error(
                                                            "error",
                                                            err
                                                          );
                                                        }
                                                        client.query(
                                                          `SELECT * FROM detais where "IDdetai" != ${chon_sinhvien.rows[0].IDdetai} `,
                                                          function (
                                                            err,
                                                            result
                                                          ) {
                                                            done();

                                                            if (err) {
                                                              res.end();
                                                              return console.error(
                                                                "error running query",
                                                                err
                                                              );
                                                            } else {
                                                              var chon_detai =
                                                                result;
                                                              pool_db.connect(
                                                                function (
                                                                  err,
                                                                  client,
                                                                  done
                                                                ) {
                                                                  if (err) {
                                                                    return console.error(
                                                                      "error",
                                                                      err
                                                                    );
                                                                  }
                                                                  client.query(
                                                                    `SELECT * FROM chudes where "IDchude" != ${chon_sinhvien.rows[0].IDchude} `,
                                                                    function (
                                                                      err,
                                                                      result
                                                                    ) {
                                                                      done();

                                                                      if (err) {
                                                                        res.end();
                                                                        return console.error(
                                                                          "error running query",
                                                                          err
                                                                        );
                                                                      } else {
                                                                        var chon_chude =
                                                                          result;
                                                                        pool_db.connect(
                                                                          function (
                                                                            err,
                                                                            client,
                                                                            done
                                                                          ) {
                                                                            if (
                                                                              err
                                                                            ) {
                                                                              return console.error(
                                                                                "error",
                                                                                err
                                                                              );
                                                                            }
                                                                            client.query(
                                                                              `SELECT * FROM giangviens where "IDgiangvien" != ${chon_sinhvien.rows[0].IDgiangvien} `,
                                                                              function (
                                                                                err,
                                                                                result
                                                                              ) {
                                                                                done();

                                                                                if (
                                                                                  err
                                                                                ) {
                                                                                  res.end();
                                                                                  return console.error(
                                                                                    "error running query",
                                                                                    err
                                                                                  );
                                                                                } else {
                                                                                  var chon_giangvien =
                                                                                    result;
                                                                                  res.render(
                                                                                    "./sinhvien.ejs",
                                                                                    {
                                                                                      chon_sinhvien:
                                                                                        chon_sinhvien
                                                                                          .rows[0],
                                                                                      chon_lop:
                                                                                        chon_lop,
                                                                                      chon_detai:
                                                                                        chon_detai,
                                                                                      lop: lop,
                                                                                      ds_sinhvien:
                                                                                        ds_sinhvien,
                                                                                      detai:
                                                                                        detai,
                                                                                      chude:
                                                                                        chude,
                                                                                      giangvien:
                                                                                        giangvien,
                                                                                      chon_chude:
                                                                                        chon_chude,
                                                                                      chon_giangvien:
                                                                                        chon_giangvien,
                                                                                    }
                                                                                  );
                                                                                }
                                                                              }
                                                                            );
                                                                          }
                                                                        );
                                                                      }
                                                                    }
                                                                  );
                                                                }
                                                              );
                                                            }
                                                          }
                                                        );
                                                      });
                                                    }
                                                  }
                                                );
                                              });
                                            }
                                          }
                                        );
                                      });
                                    }
                                  }
                                );
                              });
                            }
                          }
                        );
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

// exports.them_sinhvien = (req, res) => {
//   User.create({
//     email: req.body.email,
//     password: req.body.password,
//     role: "student",
//   })
//     .then((user) => {
//       Sinhvien.create({
//         IDsinhvien: req.body.IDsinhvien,
//         tensinhvien: req.body.tensinhvien,
//         gioitinh: req.body.gioitinh,
//         namsinh: req.body.namsinh,
//         quequan: req.body.quequan,
//         sodienthoai: req.body.sodienthoai,
//         diachi: req.body.diachi,
//         khoadaotao: req.body.khoadaotao,
//         hedaotao: req.body.hedaotao,
//         bacdaotao: req.body.bacdaotao,
//         id: user.id,
//       });
//       res.send("thanh cong");
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message });
//     });
// };

exports.them_sinhvien = async (req, res) => {
  try {
    const {
      email,
      password,
      IDsinhvien,
      tensinhvien,
      gioitinh,
      namsinh,
      quequan,
      sodienthoai,
      diachi,
      khoadaotao,
      hedaotao,
      bacdaotao,
    } = req.body;

    // const existedUser = await User.findAll({ where: { email: email } });
    // console.log(existedUser);
    // if (existedUser) {
    //   return res.status(404).json({
    //     success: false,
    //     message: `Tài khoản đã tồn tại`,
    //   });
    // }

    const newUser = {
      email: email,
      password: password,
      role: "student",
    };
    const user = await User.create(newUser);

    const newStudent = {
      IDsinhvien: IDsinhvien,
      tensinhvien: tensinhvien,
      gioitinh: gioitinh,
      namsinh: namsinh,
      quequan: quequan,
      sodienthoai: sodienthoai,
      diachi: diachi,
      khoadaotao: khoadaotao,
      hedaotao: hedaotao,
      bacdaotao: bacdaotao,
      id: user.id,
    };

    // const existedStudent = await Sinhvien.findAll({
    //   where: { IDsinhvien: IDsinhvien },
    // });
    // console.log(existedStudent);
    // if (existedStudent) {
    //   return res.status(404).json({
    //     success: false,
    //     message: `Sinh viên đã tồn tại`,
    //   });
    // }

    await Sinhvien.create(newStudent);

    return res.status(200).json({
      success: true,
      message: `Đăng ký thành công`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `${err.message}`,
    });
  }
};

exports.capnhat_sinhvien = async (req, res) => {
  await Sinhvien.update(
    {
      IDsinhvien: req.body.IDsinhvien,
      tensinhvien: req.body.tensinhvien,
      gioitinh: req.body.gioitinh,
      email: req.body.email,
      namsinh: req.body.namsinh,
      quequan: req.body.quequan,
      sodienthoai: req.body.sodienthoai,
      diachi: req.body.diachi,
      hokhuathuongchu: req.body.hokhuathuongchu,
      sourcecode: req.body.originalname,
      khoadaotao: req.body.khoadaotao,
      hedaotao: req.body.hedaotao,
      bacdaotao: req.body.bacdaotao,
      IDdetai: req.body.IDdetai,
      IDlop: req.body.IDlop,
      IDchude: req.body.IDchude,
      IDgiangvien: req.body.IDgiangvien,
    },
    {
      where: {
        IDsinhvien: req.params.IDsinhvien,
      },
    }
  )
    .then(() => {
      res.redirect("../../../quanly/sinhvien");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.xoa_sinhvien = async (req, res) => {
  await Sinhvien.destroy({
    where: {
      IDsinhvien: req.params.IDsinhvien,
    },
  })
    .then(() => {
      res.redirect("../../../quanly/sinhvien");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.timkiem_sinhvien = (req, res) => {
  pool_db.connect(function (err, client, done) {
    if (err) {
      return console.error("error", err);
    }
    const detai = req.body.IDdetai;
    const chude = req.body.IDchude;
    const lop = req.body.IDlop;
    const giangvien = req.body.IDgiangvien;
    client.query(
      `SELECT * FROM sinhviens inner join lops on sinhviens."IDlop" = lops."IDlop" inner join detais on sinhviens."IDdetai" = detais."IDdetai" inner join chudes on sinhviens."IDchude" = chudes."IDchude" inner join giangviens on sinhviens."IDgiangvien" = giangviens."IDgiangvien" where sinhviens."IDgiangvien" = ${giangvien} or sinhviens."IDdetai" = ${detai} or sinhviens."IDlop" = ${lop} or sinhviens."IDchude" = ${chude}`,
      function (err, result) {
        done();

        if (err) {
          res.end();
          return console.error("error running query", err);
        } else {
          res.send(result.rows);
        }
      }
    );
  });
};
