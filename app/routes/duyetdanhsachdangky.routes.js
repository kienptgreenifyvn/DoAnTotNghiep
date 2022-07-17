const { requireLogin } = require("../middleware/permission");
const controller = require("../controllers/duyetsinhviendangky");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/giangvien/dssinhviendangky",
    requireLogin,
    controller.danhsachsinhviendangky
  );
  app.post(
    "/giangvien/loc_danhsachsinhviendangky",
    requireLogin,
    controller.loc_danhsachsinhviendangky
  );
  app.get("/giangvien/svhuongdanh", requireLogin, controller.quanlyhuongdan);
  app.post(
    "/giangvien/loc_quanlyhuongdan",
    requireLogin,
    controller.loc_quanlyhuongdan
  );
  app.post("/giangvien/dongy", controller.chapnhan);
  app.post("/gianhvien/tuchoi", controller.tuchoi);

  app.get(
    "/giangvien/doandahuongdan",
    requireLogin,
    controller.quanlydoanhuongdan
  );
};
