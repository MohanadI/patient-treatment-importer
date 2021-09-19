const csvController = require("./controllers/csv.controller");
const upload = require("./middlewares/upload");

let routes = (app) => {
  app.post("/upload", upload.single("file"), csvController.upload);

  app.get("/patients", csvController.getPatients);
};

module.exports = routes;
