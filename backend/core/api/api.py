from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json

from core.service.midi_processing import tokenize_midi_file
from core.service.serializer import TokSequenceEncoder

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


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(content={"success": False, "data": None, "error": 'Invalid request parameters'},
                        status_code=422)


@app.post("/process")
async def process(
        file: UploadFile = File(...),
        tokenizer: str = Form(...),  # todo: validate tokenizer name
        min_pitch: int = Form(..., ge=0, le=127),  # todo: validation that min_pitch < max_pitch
        max_pitch: int = Form(..., ge=0, le=127),
        velocity_bins: int = Form(..., ge=0, le=127),
        use_chords: bool = Form(...),
        use_rests: bool = Form(...),
        use_tempos: bool = Form(...),
        use_time_signatures: bool = Form(...),
        use_sustain_pedals: bool = Form(...),
        use_pitch_bends: bool = Form(...),
        use_programs: bool = Form(...),
        nb_tempos: int = Form(..., ge=0),
        min_tempo: int = Form(..., ge=0),  # todo: validation that min_tempo < max_tempo
        max_tempo: int = Form(..., ge=0)
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
        return JSONResponse(content={"success": True, "data": json.loads(serialized_tokens), "error": None})
    except HTTPException as e:
        return JSONResponse(content={"success": False, "data": None, "error": str(e.detail)}, status_code=e.status_code)
    except Exception as e:
        return JSONResponse(content={"success": False, "data": None, "error": str(e)}, status_code=500)
