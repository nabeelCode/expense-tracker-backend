const Transaction = require("../models/transactionModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

exports.getAllTransactions = catchAsync(async (req, res, next) => {
  const transactions = await Transaction.find({})
    .select("-__v")
    .sort("-createdAt");

  res.status(200).json({
    status: "success",
    results: transactions.length,
    data: transactions,
  });
});

exports.createTransaction = catchAsync(async (req, res, next) => {
  const newTransaction = await Transaction.create(req.body);
  res.status(200).json({
    status: "success",
    data: newTransaction,
  });
});

exports.updateTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!transaction) return next(new appError(400, "no data found!"));

  res.status(200).json({
    status: "success",
    data: transaction,
  });
});

exports.deleteTransaction = catchAsync(async (req, res, next) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getTransactionsInfo = catchAsync(async (req, res, next) => {
  const info = await Transaction.aggregate([
    {
      $group: {
        _id: "$type",
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: info,
  });
});
