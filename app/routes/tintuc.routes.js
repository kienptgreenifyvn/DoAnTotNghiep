const { authJwt } = require("../middleware");
const controller = require("../controllers/tintuc.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/quanly/tintuc", controller.danhsach_tintuc);
  app.post("/quanly/tintuc/them_tintuc", controller.them_tintuc);
  app.post("/quanly/tintuc/sua_tintuc/:IDtintuc", controller.capnhat_tintuc);
  app.get("/quanly/tintuc/xoa_tintuc/:IDtintuc", controller.xoa_tintuc);
 
};