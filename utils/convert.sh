#!/bin/bash

VIDEO_PATH="$1"
OUTPUT_PATH="$2"

if [ $# -ne 2 ]; then
  echo "usage: ./convert.sh file dest"
  exit 1
fi

#
# ffmpeg -i "$VIDEO_PATH" \
#   -acodec copy \
#   -vcodec copy \
#   -filter_complex \
#   "[0:v]split=3[v1][v2][v3]; \
#     [v1]copy[v1out]; [v2]scale=w=1280:h=720[v2out]; [v3]scale=w=640:h=360[v3out]" \
#   -map "[v1out]" -c:v:0 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:0 5M -maxrate:v:0 5M -minrate:v:0 5M -bufsize:v:0 10M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 \
#   -map "[v2out]" -c:v:1 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:1 3M -maxrate:v:1 3M -minrate:v:1 3M -bufsize:v:1 3M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 \
#   -map "[v3out]" -c:v:2 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:2 1M -maxrate:v:2 1M -minrate:v:2 1M -bufsize:v:2 1M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 \
#   -map a:0 -c:a:0 aac -b:a:0 96k -ac 2 \
#   -map a:0 -c:a:1 aac -b:a:1 96k -ac 2 \
#   -map a:0 -c:a:2 aac -b:a:2 48k -ac 2 \
#   -f hls \
#   -hls_list_size 0 \
#   -hls_time 2 \
#   -hls_playlist_type vod \
#   -hls_flags independent_segments \
#   -hls_segment_type mpegts \
#   -hls_segment_filename stream_%v/data%02d.ts \
#   -master_pl_name master.m3u8 \
#   -var_stream_map "v:0,a:0 v:1,a:1 v:2,a:2" stream_%v.m3u8

# ffmpeg -i "$VIDEO_PATH" \
#   -acodec copy \
#   -vcodec copy \
#   -f hls \
#   -hls_list_size 0 \
#   -hls_time 10 \
#   -hls_playlist_type vod \
#   -hls_flags independent_segments \
#   -hls_segment_type mpegts \
#   -hls_segment_filename "$OUT_DIR/data%02d.ts" \
#   -master_pl_name "$OUT_DIR/master.m3u8" \
#   "$OUT_DIR/stream.m3u8"
#
# ffmpeg -i "$VIDEO_PATH" \
#   -acodec copy \
#   -vcodec copy \
#   -f hls \
#   -hls_list_size 0 \
#   -hls_playlist_type vod \
#   -hls_flags independent_segments \
#   -hls_segment_type mpegts \
#   -hls_segment_filename data%02d.ts \
#   -master_pl_name master.m3u8 \
#   stream.m3u8
#
# ffmpeg -i "$VIDEO_PATH" \
#   -map 0:v:0 -c:v:0 libx264 -crf:v:0 23 -preset superfast -g 48 -sc_threshold 0 -keyint_min 96 \
#   -map a:0 -c:a:0 aac -b:a:0 96k -ac 2 \
#   -f hls \
#   -hls_list_size 0 \
#   -hls_time 2 \
#   -hls_playlist_type vod \
#   -hls_flags independent_segments \
#   -hls_segment_type mpegts \
#   -hls_segment_filename data%02d.ts \
#   -master_pl_name master.m3u8 \
#   -var_stream_map "v:0,a:0" stream_0.m3u8

ffmpeg -i "$VIDEO_PATH" \
  -fflags +nobuffer+genpts \
  -map 0:v:0 -c:v libx264 \
  -preset superfast -tune zerolatency \
  -crf 23 \
  -g 48 -keyint_min 48 -sc_threshold 0 \
  -map a:0 -c:a aac -b:a 96k -ac 2 \
  -f hls \
  -hls_time 2 \
  -hls_list_size 0 \
  -hls_flags independent_segments+append_list+temp_file \
  -hls_playlist_type event \
  -hls_segment_type mpegts \
  -hls_segment_filename $OUTPUT_PATH/data%02d.ts \
  $OUTPUT_PATH/stream.m3u8
