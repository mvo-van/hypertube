import React, { useEffect } from "react";
import videojs from "video.js";

// FOR MORE VIDEO PLAYER OPTIONS, VISIT: https://videojs.com/guides/options/

// const thumbnail = 'https://www.animenewsnetwork.com/hotlink/thumbnails/crop1200x630gNE/youtube/wm0pDk3HChM.jpg';
// const videoUrl = 'http://localhost:8000/videos/587a4d55-661f-4a2c-b3d1-b3c4dfbfbfde/playlist.m3u8';

// Fetch the link to playlist.m3u8 of the video you want to play
export const VideoPlayer = ({ thumbnail, videoUrl }) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  const options = {
    autoplay: false,
    controls: true,
    playbackRates: [0.5, 1, 1.5, 2],
    height: 400,
    responsive: true,
    poster: thumbnail,
    controlBar: {
      playToggle: true,
      volumePanel: {
        inline: false,
      },
      skipButtons: {
        forward: 10,
        backward: 10,
      },
      fullscreenToggle: true,
    },
    sources: [
      {
        src: videoUrl,
        type: "application/x-mpegURL",
      },
    ],
  };
  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div
      data-vjs-player
      style={{
        width: "600px",
      }}
    >
      <div ref={videoRef} className="" />
    </div>
  );
};

export default VideoPlayer;
