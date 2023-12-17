from pydantic import BaseModel, Field, model_validator, NonNegativeInt, StrictBool
from typing import Literal, Optional
from typing_extensions import Annotated
import json


class ConfigModel(BaseModel): # TODO: beat_res, beat_res_rest, chord_maps, chord_tokens_with_root_note, chord_unknown, time_signature_range
    tokenizer: Literal['REMI', 'REMIPlus', 'MIDILike', 'TSD', 'Structured', 'CPWord', 'Octuple', 'MuMIDI', 'MMM']
    pitch_range: Annotated[list[Annotated[int, Field(ge=0, le=127)]], Field(min_items=2, max_items=2)]
    nb_velocities: Annotated[int, Field(ge=0, le=127)]
    special_tokens: list[str]
    use_chords: StrictBool
    use_rests: StrictBool
    use_tempos: StrictBool
    use_time_signatures: StrictBool
    use_sustain_pedals: StrictBool
    use_pitch_bends: StrictBool
    use_programs: StrictBool
    nb_tempos: NonNegativeInt
    tempo_range: Annotated[list[NonNegativeInt], Field(min_items=2, max_items=2)]
    log_tempos: StrictBool
    delete_equal_successive_tempo_changes: StrictBool
    sustain_pedal_duration: StrictBool
    pitch_bend_range: Annotated[list[int], Field(min_items=3, max_items=3)]
    delete_equal_successive_time_sig_changes: StrictBool
    programs: Optional[Annotated[list[int], Field(min_items=1)]]
    one_token_stream_for_programs: Optional[StrictBool]
    program_changes: Optional[StrictBool]

    @model_validator(mode='before')
    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value
