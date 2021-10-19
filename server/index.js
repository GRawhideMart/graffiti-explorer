const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json()); // Parse application/json content-type in req.body
app.use(express.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded content-type in req.body
/* As a reminder, application/x-www-form-urlencoded is a content-type in which the keys and values are encoded in key-value tuples separated by '&', */
/* with a '=' between the key and the value. Non-alphanumeric characters in both keys and values are percent encoded */
app.use(
  cors({
    origin: ["http://localhost:8081", "http://192.168.1.15:8081"],
  })
);

// Database initialization
const Graffiti = require("./models/graffiti.model");
// const Countries = require("./models/countries.model");
// const Cities = require("./models/cities.model");
// const Authors = require("./models/authors.model");
// const Users = require("./models/users.model");
// const Visits = require("./models/visits.model");
// const Comments = require("./models/comments.model");
// const associations = require("./models/associations");

const db = require("./config/db.config");
(async () => {
  // Sync the DB through an anonymous function
  try {
    await db.sync({ alter: true });
    console.log("Database synched correctly");
  } catch (error) {
    return Promise.reject(error);
  }
})();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", (req, res) => {
  console.log(
    `Received a ${req.method} request from user-agent ${
      req.headers["user-agent"]
    } with IP ${req.headers["x-forwarded-for"] || req.socket.remoteAddress}`
  );
  res.status(200).end("Hello World");
});

// Routes
require("./routes/graffiti.routes")(app);
require("./routes/geolocation.routes")(app);

// Listen
const PORT = process.env.PORT || 8000;
db.authenticate() // Try to connect to database
  .then(() => {
    // Upon successful promise completion
    console.log("Connection estabilished successfully");
    app.listen(PORT, () => {
      // Start server
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    // Upon unfulfilled promise, DO NOT start server
    console.error("Couldn't connect to database:", err.message);
  });
