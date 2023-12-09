const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const { Port, Host, LocalUrl } = require("./config");

mongoose
  .connect(LocalUrl, {
    family: 4,
  })
  .then(() => {
    console.log("Database Connected successfully 🟢");
  })
  .catch(() => {
    console.log("Connection Failed 🔴");
  });

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", express.static("./"));
app.use(
  "/api/v1/",
  require("./src/routes/groupRoutes"),
  require("./src/routes/userRoutes")
);

app.listen(Port, Host, () => {
  console.log(`Server running at http://${Host}:${Port}/`);
});
