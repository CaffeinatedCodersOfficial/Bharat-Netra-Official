import mongoose from "mongoose";

const loginHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ip: { type: String },
  region: { type: String },
  country: { type: String },
  city: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  network: { type: String }, // ISP or Org name
  timestamp: { type: Date, default: Date.now },
});

export const LoginHistory = mongoose.model("LoginHistory", loginHistorySchema);
