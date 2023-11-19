from io import BytesIO
from miditok import TokenizerConfig
from miditoolkit import MidiFile
from core.service.tokenizer_factory import TokenizerFactory


def tokenize_midi_file(midi_bytes: bytes, tokenizer: str, min_pitch: int, max_pitch: int, nb_velocities: int,
                       use_chords: bool, use_rests: bool, use_tempos: bool, use_time_signatures: bool,
                       use_programs: bool, use_sustain_pedals: bool, use_pitch_bends: bool, nb_tempos: int,
                       min_tempo: int, max_tempo: int):
    tokenizer_params = {
        "pitch_range": (min_pitch, max_pitch),
        "beat_res": {(0, 4): 8, (4, 12): 4},
        "nb_velocities": nb_velocities,
        "special_tokens": ["PAD", "BOS", "EOS", "MASK"],
        "use_chords": use_chords,
        "use_rests": use_rests,
        "use_tempos": use_tempos,
        "use_time_signatures": use_time_signatures,
        "use_programs": use_programs,
        "use_sustain_pedals": use_sustain_pedals,
        "use_pitch_bends": use_pitch_bends,
        "nb_tempos": nb_tempos,
        "tempo_range": (min_tempo, max_tempo),
    }
    config = TokenizerConfig(**tokenizer_params)

    tokenizer_factory = TokenizerFactory()
    tokenizer = tokenizer_factory.get_tokenizer(tokenizer, config)

    midi = MidiFile(file=BytesIO(midi_bytes))
    tokens = tokenizer(midi)
    return tokens
