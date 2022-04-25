const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  amount: {
    type: Number,
    required: [true, "amount is required"],
  },
  type: {
    type: String,
    required: [true, "type is required"],
    enum: {
      values: ["expense", "income"],
      message: "type should be either expense or income",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
