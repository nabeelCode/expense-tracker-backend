const appError = require("../utils/appError");

const errorController = (err, req, res, next) => {
  let error = Object.create(err);

  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (error.name === "ValidationError") {
    error = new appError(400, err.errors.type.message);
  }
  
  if (error.name === "CastError") {
    error = new appError(400, `invalid ${error.path}:${error.value}`);
  }

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

module.exports = errorController;
