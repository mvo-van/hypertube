import React, { useEffect } from "react";

export const VideoPlayer = () => {
  // const thumbnail =
  //   "https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/4a55d5e6-8e3b-4cab-a34c-e8dbe51b5cc2/compose?aspectRatio=1.78&format=webp&width=1200";
  const movie = "http://localhost:3000/stream/output.mkv";

  return (
    <video
      src={movie}
      controls
      preload="auto"
      autoPlay
      width="800"
      crossOrigin="anonymous"
    >
      <track
        kind="subtitles"
        src="http://localhost:3000/stream/output.mp4/subs?lang=fr"
        srcLang="fr"
        label="Français"
        default
        crossOrigin="anonymous"
      />
      <track
        kind="subtitles"
        src="http://localhost:3000/stream/output.mp4/subs?lang=en"
        srcLang="en"
        label="Anglais"
        crossOrigin="anonymous"
      />
    </video>
  );
};

export default VideoPlayer;
