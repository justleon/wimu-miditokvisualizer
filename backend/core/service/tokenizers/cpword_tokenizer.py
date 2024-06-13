from miditoolkit import MidiFile
from miditok import CPWord

class CPWordTokenizer(CPWord):
    def __init__(self, config):
        super().__init__(config)

    def midi_to_tokens(self, midi: MidiFile):
        tokens = super().midi_to_tokens(midi)
        
        for token_list in tokens:
            current_note_id = None
            for compound_token in token_list.events:
                if compound_token[0].value == "Note":
                    for token in compound_token:
                        if token.type == "Pitch":
                            current_note_id = f"{token.time}:{token.value}"
                            token.note_id = current_note_id
                        elif token.type in ["Velocity", "Duration"]:
                            if current_note_id:
                                token.note_id = current_note_id
                        else:
                            token.note_id = None  

        return tokens