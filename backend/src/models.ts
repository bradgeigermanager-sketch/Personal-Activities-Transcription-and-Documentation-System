import { Schema, model } from "mongoose";

const SegmentSchema = new Schema({
  audio_id: { type: String, required: true },
  speaker: { type: String, required: true },
  start: { type: Number, required: true },
  end: { type: Number, required: true }
});

export const Segment = model("Segment", SegmentSchema);
