import muspy

from core.constants import EXAMPLE_MIDI_FILE_PATH
from core.service.midi_processing import retrieve_information_from_midi, retrieve_basic_data, retrieve_metrics


def test_retrieve_basic_info():
    music_file = muspy.read(EXAMPLE_MIDI_FILE_PATH)
    basic_info_data = retrieve_basic_data(music_file)
    assert basic_info_data
    print(basic_info_data)


def test_retrieve_metrics():
    music_file = muspy.read(EXAMPLE_MIDI_FILE_PATH)
    metrics = retrieve_metrics(music_file)
    assert metrics
    print(metrics)


def test_retrieve_info():
    music_obj = open(EXAMPLE_MIDI_FILE_PATH, 'rb')
    music_obj_bytes: bytes = music_obj.read()

    music = retrieve_information_from_midi(music_obj_bytes)
    assert music
    print(music)
