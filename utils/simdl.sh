#!/bin/bash

SRC=$1
OUTPUT_PATH=$2

if [ $# -ne 2 ]; then
  echo "usage: ./simdl.sh file dest"
  exit 1
fi

EXT=${SRC##*.}
DEST="downloaded.$EXT"
OUTPUT_PATH=$(realpath $OUTPUT_PATH)

pv -L 10M "$SRC" >"$OUTPUT_PATH/$DEST"
