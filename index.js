require("express-async-errors");
require("winston-mongodb");
const { configDotenv } = require("dotenv");
configDotenv();
const express = require("express");
const connectionDB = require("./src/db/db");
const genres = require("./src/routes/genres");
const customers = require("./src/routes/customers");
const movies = require("./src/routes/movies");
const rentals = require("./src/routes/rentals");
const users = require("./src/routes/users");
const auth = require("./src/routes/auth");
const error = require("./src/middlewares/error");
const winston = require("winston");

connectionDB();
const app = express();
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

winston.configure({
  transports: [
    new winston.transports.File({ filename: "logfile.log" }),
    new winston.transports.MongoDB({
      db: process.env.MONGO_URL,
      options: { useUnifiedTopology: true },
      collection: "errorLog",
    }),
  ],
});

process.on("uncaughtException", (ex) => {
  console.log("WE GOT UNCAUGHT EXCEPTION");
  winston.error(ex.message, ex);
  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  throw ex;
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("App is Listening to the Port " + PORT));
