from io import BytesIO
from miditok import TokenizerConfig
from miditoolkit import MidiFile
from core.service.tokenizer_factory import TokenizerFactory
from core.api.model import ConfigModel


def tokenize_midi_file(user_config: ConfigModel, midi_bytes: bytes):
    tokenizer_params = {
        "pitch_range": tuple(user_config.pitch_range),
        "beat_res": {(0, 4): 8, (4, 12): 4},
        "nb_velocities": user_config.nb_velocities,
        "special_tokens": user_config.special_tokens,
        "use_chords": user_config.use_chords,
        "use_rests": user_config.use_rests,
        "use_tempos": user_config.use_tempos,
        "use_time_signatures": user_config.use_time_signatures,
        "use_sustain_pedals": user_config.use_sustain_pedals,
        "use_pitch_bends": user_config.use_pitch_bends,
        "nb_tempos": user_config.nb_tempos,
        "tempo_range": tuple(user_config.tempo_range),
        "log_tempos": user_config.log_tempos,
        "delete_equal_successive_tempo_changes": user_config.delete_equal_successive_tempo_changes,
        "sustain_pedal_duration": user_config.sustain_pedal_duration,
        "pitch_bend_range": user_config.pitch_bend_range,
        "delete_equal_successive_time_sig_changes": user_config.delete_equal_successive_time_sig_changes,
        # TODO: dynamic config preparation as not all tokenizers are compatible with program parameters
        # "use_programs": user_config.use_programs,
        # "programs": user_config.programs,
        # "one_token_stream_for_programs": user_config.one_token_stream_for_programs,
        # "program_changes": user_config.program_changes,
    }
    tokenizer_config = TokenizerConfig(**tokenizer_params)

    tokenizer_factory = TokenizerFactory()
    tokenizer = tokenizer_factory.get_tokenizer(user_config.tokenizer, tokenizer_config)

    midi = MidiFile(file=BytesIO(midi_bytes))
    tokens = tokenizer(midi)
    return tokens
