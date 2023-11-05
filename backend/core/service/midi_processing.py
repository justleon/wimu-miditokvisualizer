from io import BytesIO
from miditok import REMI, TokenizerConfig
from miditoolkit import MidiFile

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


def tokenize_midi_file(midi_bytes: bytes):
    config = TokenizerConfig(**TOKENIZER_PARAMS)
    tokenizer = REMI(config)

    midi = MidiFile(file=BytesIO(midi_bytes))
    tokens = tokenizer(midi)
    return tokens
