from miditoolkit import MidiFile
from miditok import (
    MMM,
    REMI,
    TSD,
    CPWord,
    MIDILike,
    MIDITokenizer,
    MuMIDI,
    Octuple,
    REMIPlus,
    Structured,
    TokenizerConfig
)


class REMITokenizerExtended(REMI):
    def __init__(self, config):
        super().__init__(config)

    def midi_to_tokens(self, midi: MidiFile):
        tokens = super().midi_to_tokens(midi)

        for instrument in midi.instruments:
            for note in instrument.notes:
                print(f"Note: {note.pitch}, Start: {note.start}", flush=True)

        current_note_id = None
        for token_list in tokens:
            current_note_id = None
            for token in token_list.events:
                if token.type == "Pitch":
                    current_note_id = f"{token.time}:{token.value}"
                    token.note_id = current_note_id
                elif token.type in ["Velocity", "Duration"]:
                    if current_note_id:
                        token.note_id = current_note_id
                else:
                    token.note_id = None  

        return tokens


class TokenizerFactory:
    def get_tokenizer(self, tokenizer_type: str, config: TokenizerConfig) -> MIDITokenizer:
        match tokenizer_type:
            case "REMI":
                return REMITokenizerExtended(config)
            case "REMIPlus":
                return REMIPlus(config)
            case "MIDILike":
                return MIDILike(config)
            case "TSD":
                return TSD(config)
            case "Structured":
                return Structured(config)
            case "CPWord":
                return CPWord(config)
            case "Octuple":
                return Octuple(config)
            case "MuMIDI":
                return MuMIDI(config)
            case "MMM":
                return MMM(config)
            case _:
                raise ValueError(tokenizer_type)
