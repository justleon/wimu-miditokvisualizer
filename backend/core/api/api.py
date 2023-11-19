from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from core.service.midi_processing import tokenize_midi_file
from miditok import TokSequence, Event
import json
import numpy as np

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://wimu-frontend-ccb0bbc023d3.herokuapp.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.post("/process")
async def process(
        file: UploadFile = File(...),
        tokenizer: str = Form(...),
        min_pitch: int = Form(...),
        max_pitch: int = Form(...),
        velocity_bins: int = Form(...),
        use_chords: bool = Form(...),
        use_rests: bool = Form(...),
        use_tempos: bool = Form(...),
        use_time_signatures: bool = Form(...),
        use_sustain_pedals: bool = Form(...),
        use_pitch_bends: bool = Form(...),
        use_programs: bool = Form(...),
        nb_tempos: int = Form(...),
        min_tempo: int = Form(...),
        max_tempo: int = Form(...)
):
    try:
        if file.content_type not in ["audio/mid", "audio/midi", "audio/x-mid", "audio/x-midi"]:
            raise HTTPException(status_code=415, detail="Unsupported file type")
        midi_bytes: bytes = await file.read()
        tokens: list = tokenize_midi_file(midi_bytes=midi_bytes, tokenizer=tokenizer, min_pitch=min_pitch,
                                          max_pitch=max_pitch, nb_velocities=velocity_bins, use_chords=use_chords,
                                          use_programs=use_programs, use_rests=use_rests,
                                          use_sustain_pedals=use_sustain_pedals,
                                          use_time_signatures=use_time_signatures, use_tempos=use_tempos,
                                          use_pitch_bends=use_pitch_bends, min_tempo=min_tempo, max_tempo=max_tempo,
                                          nb_tempos=nb_tempos)
        serialized_tokens = json.dumps(tokens, cls=TokSequenceEncoder)
        return JSONResponse(content={"sequences": json.loads(serialized_tokens)})
    except HTTPException as e:
        return JSONResponse(content={"error": str(e.detail)}, status_code=e.status_code)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


class TokSequenceEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, TokSequence):
            return {"tokens": obj.events}
        if isinstance(obj, Event):
            return {"type": obj.type, "value": obj.value, "time": obj.time, "program": obj.program, "desc": obj.desc}
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        return super(TokSequenceEncoder, self).default(obj)
