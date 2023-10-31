from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}


@app.get("/fizz_buzz/{num}")
def read_item(num: int):
    if not num % 15:
        return {num: "Fizz Buzz"}
    elif not num % 5 or not num % 3:
        return {num: 'Fizz' if not num % 3 else 'Buzz'}
    else:
        return {num: 'Stay Silent'}