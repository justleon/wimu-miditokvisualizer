from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from core.service.midi_processing import tokenize_midi_file

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
async def process(file: UploadFile):
    try:
        midi_bytes: bytes = await file.read()
        tokens: list = tokenize_midi_file(midi_bytes)
        return JSONResponse(content={"message": "MIDI file converted successfully"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": "Conversion failed", "error": str(e)})
