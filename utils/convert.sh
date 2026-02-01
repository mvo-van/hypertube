#!/bin/bash

VIDEO_PATH="$1"
OUTPUT_PATH="$2"

if [ $# -ne 2 ]; then
  echo "usage: ./convert.sh file dest"
  exit 1
fi

# ffmpeg -i "$VIDEO_PATH" \
#   -fflags +nobuffer+genpts \
#   -map 0:v:0 -c:v libx264 \
#   -preset superfast -tune zerolatency \
#   -crf 23 \
#   -g 48 -keyint_min 48 -sc_threshold 0 \
#   -map a -c:a aac -b:a 96k -ac 2 \
#   -f hls \
#   -hls_time 2 \
#   -hls_list_size 1 \
#   -hls_flags independent_segments+append_list+temp_file \
#   -hls_playlist_type event \
#   -hls_segment_type mpegts \
#   -hls_segment_filename $OUTPUT_PATH/data%02d.ts \
#   $OUTPUT_PATH/stream.m3u8

# ffmpeg -i "$VIDEO_PATH" \
#   -fflags +nobuffer+genpts \
#   -map 0:v:0 \
#   -c:v libx264 \
#   -preset superfast -tune zerolatency \
#   -crf 23 \
#   -g 48 -keyint_min 48 -sc_threshold 0 \
#   -map 0:a \
#   -c:a aac -b:a 96k -ac 2 \
#   -f hls \
#   -hls_time 2 \
#   -hls_list_size 1 \
#   -hls_playlist_type event \
#   -hls_flags independent_segments+append_list+temp_file \
#   -var_stream_map "v:0 a:0 a:1" \
#   -master_pl_name master.m3u8 \
#   $OUTPUT_PATH/stream_%v.m3u8

ffmpeg -i "$VIDEO_PATH" -c:v libx264 -preset fast -crf 23 -c:a aac -movflags +faststart "$OUTPUT_PATH"
