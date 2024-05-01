const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
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
};
