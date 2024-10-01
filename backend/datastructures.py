from typing import Iterable, Mapping, Tuple

def iter_multi_items(mapping: Mapping[str, Iterable[str]]) -> Iterable[Tuple[str, str]]:
    """Iterate over multi-value mapping items."""
    for key, values in mapping.items():
        if isinstance(values, str):
            yield key, values
        else:
            for value in values:
                yield key, value
