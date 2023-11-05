import os
import pytest
from fastapi.testclient import TestClient
from core.api.api import app, process
from core.constants import DATA_DIR

MIDI_FILE_NAME = "example.mid"
MIDI_FILE_PATH = os.path.join(DATA_DIR, MIDI_FILE_NAME)

client = TestClient(app)


@pytest.fixture
def event_loop():
    import asyncio
    loop = asyncio.get_event_loop()
    yield loop
    loop.close()


@pytest.mark.asyncio
async def test_upload_file():
    with open(MIDI_FILE_PATH, "rb") as file:
        form_data = {"file": file}
        response = client.post("/process", files=form_data)
        assert response.status_code == 200
