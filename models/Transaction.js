import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  balance: { type: Number, required: true },
});

export default mongoose.model("Transaction", TransactionSchema);
