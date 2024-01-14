from core.constants import EXAMPLE_MIDI_FILE_PATH
from core.service.midi_processing import retrieve_information_from_midi


def test_retrieve_basic_info():
    pass


def test_retrieve_metrics():
    pass


def test_retrieve_info():
    music = retrieve_information_from_midi(EXAMPLE_MIDI_FILE_PATH)
    print(music)
    assert music
