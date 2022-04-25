const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log(err.name, " -> ", err.message);
  console.log("UNCAUGHT EXCEPTION 💥 Shutting down..");
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("DB connection is successful"))
  .catch((err) => console.log(err));

const server = app.listen(port, () => {
  console.log("server is listening ");
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, " -> ", err.message);
  console.log("UNHANDLED REJECTION 💥 SHUTTING DOWN..");

  server.close(() => exit(1));
});
