class appError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    this.statusCode = statusCode;
    this.statusMessage = message;
  }
}

module.exports = appError;
