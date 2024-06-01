from miditoolkit import MidiFile
from miditok import MIDILike

class MIDILikeTokenizer(MIDILike):
    def __init__(self, config):
        super().__init__(config)

    def midi_to_tokens(self, midi: MidiFile):
        tokens = super().midi_to_tokens(midi)

        active_notes = {}
        current_note_id = None

        for token_list in tokens:
            for token in token_list.events:
                if token.type == "NoteOn":
                    current_note_id = f"{token.time}:{token.value}"
                    active_notes[token.value] = current_note_id
                    token.note_id = current_note_id
                elif token.type == "Velocity":
                    if current_note_id:
                        token.note_id = current_note_id
                elif token.type == "NoteOff":
                    if token.value in active_notes:
                        token.note_id = active_notes.pop(token.value)
                    else:
                        token.note_id = None
                    current_note_id = None
                else:
                    token.note_id = None  

        return tokens