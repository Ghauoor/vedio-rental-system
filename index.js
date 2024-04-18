const express = require("express");
const connectionDB = require("./src/config/db");
const genres = require("./src/routes/genres");
const customers = require("./src/routes/customers");
const movies = require("./src/routes/movies");
const rentals = require("./src/routes/rentals");
const users = require("./src/routes/users");

const app = express();
connectionDB();
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("App is Listening to the Port " + PORT));
