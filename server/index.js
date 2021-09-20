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
    origin: "http://localhost:8081",
  })
);

app.get("/", (req, res) => {
  console.log(
    `Received a ${req.method} request from user-agent ${
      req.headers["user-agent"]
    } with IP ${req.headers["x-forwarded-for"] || req.socket.remoteAddress}`
  );
  res.status(200).end("Hello World");
});

// Listen
const PORT = process.env.PORT || 8000;
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server started on port ${PORT}`);
});
