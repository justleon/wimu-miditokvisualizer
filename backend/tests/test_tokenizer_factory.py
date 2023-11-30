import pytest
from miditok import TokenizerConfig
from core.service.tokenizer_factory import TokenizerFactory


def test_get_tokenizer():
    tokenizers_list = ["REMI", "REMIPlus", "MIDILike", "TSD",
                       "Structured", "CPWord", "Octuple", "MuMIDI", "MMM"]

    for tokenizer in tokenizers_list:
        try:
            tokenizer_factory = TokenizerFactory()
            config = TokenizerConfig()
            tokenizer_factory.get_tokenizer(tokenizer, config)
        except Exception as e:
            assert False, f"'get_tokenizer' raised an exception {e}"


def test_get_tokenizer_fail():
    with pytest.raises(ValueError):
        tokenizer_factory = TokenizerFactory()
        config = TokenizerConfig()
        tokenizer_factory.get_tokenizer("SomeRandomString", config)
