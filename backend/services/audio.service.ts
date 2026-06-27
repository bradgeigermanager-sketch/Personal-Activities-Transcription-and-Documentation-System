import { v4 as uuid } from "uuid";
import { Audio } from "../models/audio.model";
import { uploadToS3 } from "./storage.service";

export async function handleAudioUpload(user_id: string, file: Express.Multer.File, device: string) {
  const audio_id = uuid();
  const key = `audio/${user_id}/${audio_id}.m4a`;

  const file_path = await uploadToS3(file.buffer, key, file.mimetype);

  const record = await Audio.create({
    audio_id,
    user_id,
    file_path,
    device,
    metadata: { format: file.mimetype }
  });

  return record;
}
