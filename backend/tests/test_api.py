import pytest
from api.api import read_root

def test_capital_case():
    assert read_root()