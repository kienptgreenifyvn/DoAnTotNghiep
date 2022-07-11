const { authJwt } = require("../middleware");
const controller = require("../controllers/timkiemdetai");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/sinhvien/timkiemdetai", controller.danhsach_detai_sv);
  app.post("/sinhvien/locdetai", controller.loc_detai);
  app.get("/giangvien/timkiemdetai", controller.danhsach_detai_gv);
  app.post("/giangvien/locdetai_gv", controller.loc_detaigv);
};
