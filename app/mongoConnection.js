const mongoose = require("mongoose");

const mongoDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/webclient_final")
    .then(() => console.log("mongoDB connected"))
    .catch(() => console.log("mongoDB connection failed"));
};

module.exports = mongoDB;
