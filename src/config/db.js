const { configDotenv } = require("dotenv");
const mongooes = require("mongoose");
configDotenv();

const connectionDB = async () => {
  try {
    const conn = await mongooes.connect(process.env.MONGO_URL);
    console.log(`MongoDB connect: ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
module.exports = connectionDB;
