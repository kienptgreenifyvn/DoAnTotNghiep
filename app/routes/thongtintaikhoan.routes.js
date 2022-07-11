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
    controller.thongtintaikhoan
  );
  app.post(
    "/sinhvien/capnhatthongtin",
    permission.requireLogin,
    controller.capnhatthongtin
  );
};
