import os

ROOT_DIR = os.path.realpath(os.path.join(os.path.dirname(__file__), "."))
DATA_DIR = os.path.join(ROOT_DIR, "data")

DEFAULT_TOKENIZER_PARAMS = {
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
