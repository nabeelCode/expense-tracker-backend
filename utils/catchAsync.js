const catchAsync = (fn) => {
  return (req, res, next) => {
    // passing err object with next function will call the global error controller.
    fn(req, res, next).catch(next);
  };
};

module.exports = catchAsync;
