# diarization_service.py
from flask import Flask, request, jsonify
from pyannote.audio import Pipeline
import tempfile

app = Flask(__name__)
pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization")

@app.post("/diarize")
def diarize():
    audio_bytes = request.data
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=True) as tmp:
        tmp.write(audio_bytes)
        tmp.flush()
        diarization = pipeline(tmp.name)

    segments = []
    for turn, _, speaker in diarization.itertracks(yield_label=True):
        segments.append({
            "speaker": speaker,
            "start": turn.start,
            "end": turn.end
        })

    return jsonify({ "segments": segments })
