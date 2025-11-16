import express from "express";
import mongoose from "mongoose";
import cors from "cors"; 
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import contactRoutes from "./routes/contactRoutes.js"
import auth from "./middleware/auth.js";

dotenv.config();
const app = express();

// Allow requests from any origin
app.use(cors({
  origin: function(origin, callback) {
    callback(null, true); 
  },
  credentials: true       
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/contact", contactRoutes);

// Protected test route
app.get("/api/profile", auth, (req, res) => {
  res.json({ msg: "Protected profile route", user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
