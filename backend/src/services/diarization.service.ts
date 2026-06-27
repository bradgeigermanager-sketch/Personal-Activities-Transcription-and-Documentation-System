import axios from "axios";
import { Segment } from "../models/segments.model";
import { Audio } from "../models/audio.model";

export async function runDiarization(audio_id: string, fileBuffer: Buffer) {
  const response = await axios.post(
    "http://localhost:5001/diarize",
    fileBuffer,
    { headers: { "Content-Type": "audio/m4a" } }
  );

  const segments = response.data.segments;

  await Segment.deleteMany({ audio_id });

  for (const seg of segments) {
    await Segment.create({
      audio_id,
      speaker: seg.speaker,
      start: seg.start,
      end: seg.end
    });
  }

  await Audio.updateOne(
    { audio_id },
    { status: "diarization_complete" }
  );

  return segments;
}
