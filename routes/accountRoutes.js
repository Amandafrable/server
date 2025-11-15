import express from "express";
import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET all accounts for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user.userId });
    res.json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET all transactions for logged-in user
router.get("/transactions", authMiddleware, async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user.userId });
    const accountIds = accounts.map(acc => acc._id);

    const transactions = await Transaction.find({
      accountId: { $in: accountIds }
    }).sort({ date: -1 });

    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET transactions for a specific account
router.get("/:accountId/transactions", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      accountId: req.params.accountId,
    }).sort({ date: -1 });

    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
