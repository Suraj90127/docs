import mongoose from "mongoose";

const fancyResultSchema = new mongoose.Schema({
  gameId: {
    type: Number,
    required: true
  },
  event_id: {
    type: Number,
    required: true
  },
  eventName: {
    type: String,
    required: true
  },
  marketName: {
    type: String,
    required: true
  },
  market_id: {
    type: Number,
    required: true
  },
  final_result: {
    type: Number,
  },
  status: {
    type: Number,
    enum: [0,1,2],
    default: 0
  }

}, { timestamps: true });

export default mongoose.model("fancyResult", fancyResultSchema);
