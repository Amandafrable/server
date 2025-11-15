import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  balance: { type: Number, required: true },
  currency: { type: String, default: "USD" },
  last4: { type: String, required: true },
  dormant: { type: Boolean, default: false }
});

export default mongoose.model("Account", AccountSchema);
