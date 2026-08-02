"""Generate the local Hiztegle validation lists from an EHME TSV export.

The source export is intentionally kept under the ignored ``scripts/``
directory. The generated, runtime-only lists contain one uppercase word per
line and are split by word length so the app only loads the list it needs.
"""

from __future__ import annotations

import csv
import json
import re
from pathlib import Path


MIN_LENGTH = 2
MAX_LENGTH = 13
SOURCE = Path("scripts/ehme-2-13-letrak.txt")
FREE_MODE_WORDS = Path("src/data/hiztegia.json")
OUTPUT_DIR = Path("src/data/hitzak")
PLAYABLE_WORD = re.compile(r"^[A-ZÑ]+$")
KNOWN_INVALID_WORDS = {"ZETATSUA", "ZETATSUAGOA"}


def main() -> None:
    words_by_length = {
        length: set() for length in range(MIN_LENGTH, MAX_LENGTH + 1)
    }
    excluded: list[str] = []
    supplemental: list[str] = []

    with SOURCE.open("r", encoding="latin-1", newline="") as source:
        reader = csv.DictReader(source, delimiter="\t")
        if not reader.fieldnames or "hitza" not in reader.fieldnames:
            raise RuntimeError("The EHME export does not contain a 'hitza' column")

        for row in reader:
            word = row["hitza"].strip().upper()
            length = len(word)

            if word in KNOWN_INVALID_WORDS:
                excluded.append(word)
                continue

            if not MIN_LENGTH <= length <= MAX_LENGTH:
                excluded.append(word)
                continue

            # Hiztegle's keyboard supports the Latin letters and Ñ. EHME has
            # one accented foreign form in this export which cannot be typed.
            if not PLAYABLE_WORD.fullmatch(word):
                excluded.append(word)
                continue

            words_by_length[length].add(word)

    # A target shown by the game must always be accepted as a guess. Keep
    # playable C1 targets even when a form is not attested in EHME.
    with FREE_MODE_WORDS.open("r", encoding="utf-8") as source:
        for raw_word in json.load(source):
            word = raw_word.strip().upper()
            length = len(word)
            if (
                MIN_LENGTH <= length <= MAX_LENGTH
                and PLAYABLE_WORD.fullmatch(word)
                and word not in words_by_length[length]
            ):
                words_by_length[length].add(word)
                supplemental.append(word)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    total = 0
    for length, words in words_by_length.items():
        output = OUTPUT_DIR / f"valid-{length}.txt"
        ordered_words = sorted(words)
        with output.open("w", encoding="utf-8", newline="\n") as destination:
            destination.write("\n".join(ordered_words) + "\n")
        total += len(ordered_words)
        print(f"{length:2}: {len(ordered_words):6} words -> {output}")

    print(f"Total: {total} playable words")
    if excluded:
        print(f"Excluded ({len(excluded)}): {', '.join(excluded)}")
    if supplemental:
        print(f"Added from the C1 target list ({len(supplemental)}): {', '.join(supplemental)}")


if __name__ == "__main__":
    main()
