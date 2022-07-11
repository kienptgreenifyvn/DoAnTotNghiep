const controller = require("../controllers/tranggiangvien");
const { permission } = require("../middleware");
module.exports = function (app) {
  app.get("/giangvien", permission.requireLogin, controller.tranggiangvien);
};
