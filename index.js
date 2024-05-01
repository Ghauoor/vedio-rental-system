const { configDotenv } = require("dotenv");
configDotenv();
const express = require("express");

const app = express();
require("./src/startup/logging")();
require("./src/db/db")();
require("./src/startup/routes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("App is Listening to the Port " + PORT));
