const express = require("express");
const transactionController = require("../controllers/transactionController");

const router = express.Router();

router
  .route("/get-transactions-info")
  .get(transactionController.getTransactionsInfo);

router
  .route("/")
  .get(transactionController.getAllTransactions)
  .post(transactionController.createTransaction);

router
  .route("/:id")
  .patch(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);

module.exports = router;
