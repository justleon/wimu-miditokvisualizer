import uvicorn


if __name__ == "__main__":
    uvicorn.run("core.api.api:app", host="localhost", port=8000, reload=True)