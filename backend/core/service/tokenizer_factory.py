import string
from miditok import (TokenizerConfig, MIDITokenizer, REMI, REMIPlus, MIDILike,
                     TSD, Structured, CPWord, Octuple, MuMIDI, MMM)


class TokenizerFactory:
    def get_tokenizer(self, tokenizer_type: string, config: TokenizerConfig) -> MIDITokenizer:
        match tokenizer_type:
            case "REMI":
                return REMI(config)
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
