import json
from miditok import TokSequence, Event
import numpy as np


def get_serialized_tokens(tokens: list[TokSequence]):
    return json.dumps(tokens, cls=TokSequenceEncoder)


class TokSequenceEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, TokSequence):
            return obj.events
        if isinstance(obj, Event):
            return {"type": obj.type, "value": obj.value, "time": obj.time, "program": obj.program, "desc": obj.desc}
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        return super(TokSequenceEncoder, self).default(obj)
