import { Router } from "express";
import multer from "multer";
import { handleAudioUpload } from "../../services/audio.service";

const upload = multer();
const router = Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const user_id = req.headers["x-user-id"] as string; // replace with real auth
    const device = req.body.device || "mobile";

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const record = await handleAudioUpload(user_id, req.file, device);

    res.json({
      audio_id: record.audio_id,
      status: "uploaded"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
