const { authJwt } = require("../middleware");
const controller = require("../controllers/thongtintaikhoan");
const { permission } = require("../middleware");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/sinhvien/thongtintaikhoan",
    permission.requireLogin,
    controller.thongtintaikhoan_sv
  );
  app.post(
    "/sinhvien/capnhatthongtin",
    permission.requireLogin,
    controller.capnhatthongtin_sv
  );

  app.get(
    "/giangvien/thongtintaikhoan",
    permission.requireLogin,
    controller.thongtintaikhoan_gv
  );
  app.post(
    "/giangvien/capnhatthongtin",
    permission.requireLogin,
    controller.capnhatthongtin_gv
  );
};
