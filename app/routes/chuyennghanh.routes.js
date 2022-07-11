const { authJwt } = require("../middleware");
const controller = require("../controllers/chuyennghanh.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/quanly/chuyennghanh", controller.danhsach_chuyennghanh);
  app.post("/quanly/chuyennghanh/them_chuyennghanh", controller.them_chuyennghanh);
  app.post("/quanly/chuyennghanh/sua_chuyennghanh/:IDdonvi", controller.capnhat_chuyennghanh);
  app.get("/quanly/chuyennghanh/xoa_chuyennghanh/:IDdonvi", controller.xoa_chuyennghanh);
 
};