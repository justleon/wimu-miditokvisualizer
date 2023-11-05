from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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


@app.get("/")
def read_root():
    return {"200": "Welcome To Heroku!"}


@app.post("/process")
def process_file():
    return tokenize_midi_file()
