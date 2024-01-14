from io import BytesIO

import muspy
from miditok import TokenizerConfig
from miditoolkit import MidiFile
from core.service.tokenizer_factory import TokenizerFactory
from core.api.model import ConfigModel, MusicInformationData, BasicInfoData, MetricsData


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
        # "programs": list(range(user_config.programs[0], user_config.programs[1])),
        # "one_token_stream_for_programs": user_config.one_token_stream_for_programs,
        # "program_changes": user_config.program_changes,
    }
    tokenizer_config = TokenizerConfig(**tokenizer_params)

    tokenizer_factory = TokenizerFactory()
    tokenizer = tokenizer_factory.get_tokenizer(user_config.tokenizer, tokenizer_config)

    midi = MidiFile(file=BytesIO(midi_bytes))
    tokens = tokenizer(midi)
    return tokens


def retrieve_information_from_midi(midi_file_path: str):
    midi_file_music = muspy.read(midi_file_path)

    retrieve_basic_information(midi_file_music)
    retrieve_metrics(midi_file_music)
    # music_info_data = create_music_info_data()

    return midi_file_music


def create_music_info_data(basic_info: BasicInfoData, metrics_data: MetricsData) -> MusicInformationData:
    pass


def retrieve_basic_information(music_file: muspy.Music) -> BasicInfoData:
    tempos = list[tuple[int, float]]()
    for tempo in music_file.tempos:
        tempo_data = (tempo.time, tempo.qpm)
        tempos.append(tempo_data)

    key_signatures = list[tuple[int, int, str]]()
    for key_signature in music_file.key_signatures:
        tempo_data = (key_signature.time, key_signature.root, key_signature.mode)
        key_signatures.append(tempo_data)

    time_signatures = list[tuple[int, int, int]]()
    for time_signature in music_file.time_signatures:
        tempo_data = (time_signature.time, time_signature.numerator, time_signature.denominator)
        time_signatures.append(tempo_data)

    return BasicInfoData(
        music_file.metadata.title,
        music_file.resolution,
        tempos,
        key_signatures,
        time_signatures
    )


def retrieve_metrics(music_file: muspy.Music) -> MetricsData:
    pass
