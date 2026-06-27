import { Schema, model } from "mongoose";

const AudioSchema = new Schema({
  audio_id: { type: String, required: true },
  user_id: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  duration: { type: Number, default: null },
  status: { type: String, default: "uploaded" },
  file_path: { type: String, required: true },
  device: { type: String, default: "mobile" },
  metadata: {
    sample_rate: Number,
    channels: Number,
    format: String
  }
});

export const Audio = model("Audio", AudioSchema);
