const express = require("express");
const app = express();
const db = require("./models");
const cors = require('cors');
const initRoutes = require("./routes");
const PORT = process.env.PORT || 3001;

global.__basedir = __dirname + "/..";

app.use(cors());

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

db.sequelize.sync();

app.listen(PORT, () => {
  console.log(`Running at localhost:${PORT}`);
});
