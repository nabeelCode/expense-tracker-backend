const express = require("express");
const transactionRoute = require("./routes/transactionRoute");
const errorController = require("./controllers/errorController");

const app = express();

// MIDDLEWARES
app.use(express.json());

//ROUTES
app.use("/api/v1/transactions", transactionRoute);

// handle unhandled routes
app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `${req.originalUrl} is not Found!`,
  });
});

app.use(errorController);

module.exports = app;
