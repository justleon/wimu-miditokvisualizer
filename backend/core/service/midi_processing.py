from io import BytesIO
from miditok import TokenizerConfig
from miditoolkit import MidiFile
from core.service.tokenizer_factory import TokenizerFactory


def tokenize_midi_file(midi_bytes: bytes):
    # TODO: TokenizerConfig should be constructed according to the frontend form results
    config = TokenizerConfig()

    tokenizer_factory = TokenizerFactory()
    tokenizer = tokenizer_factory.get_tokenizer("REMI", config)

    midi = MidiFile(file=BytesIO(midi_bytes))
    tokens = tokenizer(midi)
    return tokens
