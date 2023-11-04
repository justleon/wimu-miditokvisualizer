import os
from miditok import REMI, TokenizerConfig
from miditoolkit import MidiFile

from core.constants import DATA_DIR

EXAMPLE_FILE_PATH = os.path.join(DATA_DIR, "example.mid")

TOKENIZER_PARAMS = {
    "pitch_range": (21, 109),
    "beat_res": {(0, 4): 8, (4, 12): 4},
    "nb_velocities": 32,
    "special_tokens": ["PAD", "BOS", "EOS", "MASK"],
    "use_chords": True,
    "use_rests": False,
    "use_tempos": True,
    "use_time_signatures": False,
    "use_programs": False,
    "nb_tempos": 32,
    "tempo_range": (40, 250),
}


def tokenize_midi_file():
    config = TokenizerConfig(**TOKENIZER_PARAMS)
    tokenizer = REMI(config)

    midi = MidiFile(EXAMPLE_FILE_PATH)
    tokens = tokenizer(midi)
    return len(tokens)
