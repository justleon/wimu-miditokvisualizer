from miditoolkit import MidiFile
from miditok import (
    MMM,
    MIDITokenizer,
    MuMIDI,
    REMIPlus,
    TokenizerConfig
)

from core.service.tokenizers.remi_tokenizer import REMITokenizer
from core.service.tokenizers.midilike_tokenizer import MIDILikeTokenizer
from core.service.tokenizers.tsd_tokenizer import TSDTokenizer
from core.service.tokenizers.structured_tokenizer import StructuredTokenizer
from core.service.tokenizers.cpword_tokenizer import CPWordTokenizer
from core.service.tokenizers.octuple_tokenizer import OctupleTokenizer

class TokenizerFactory:
    def get_tokenizer(self, tokenizer_type: str, config: TokenizerConfig) -> MIDITokenizer:
        match tokenizer_type:
            case "REMI":
                return REMITokenizer(config)
            case "REMIPlus":
                return REMIPlus(config) # Not used by frontend
            case "MIDILike":
                return MIDILikeTokenizer(config)
            case "TSD":
                return TSDTokenizer(config)
            case "Structured":
                return StructuredTokenizer(config)
            case "CPWord":
                return CPWordTokenizer(config)
            case "Octuple":
                return OctupleTokenizer(config)
            case "MuMIDI":
                return MuMIDI(config) # Not used by frontend
            case "MMM":
                return MMM(config) # Not used by frontend
            case _:
                raise ValueError(tokenizer_type)
