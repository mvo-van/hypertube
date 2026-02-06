import React, { useEffect, useState } from "react";
import { api } from "../../common/api";

export const VideoPlayer = () => {
  // const thumbnail =
  //   "https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/4a55d5e6-8e3b-4cab-a34c-e8dbe51b5cc2/compose?aspectRatio=1.78&format=webp&width=1200";
  const [subtitles, SetSubtitles] = useState([]);
  const movie = "http://localhost:3000/stream/output.mkv";

  const getSubtitles = async () => {
    try {
      const res = await api.get(`http://localhost:3000/stream/tt0775431/subs`);
      console.log(res)
    } catch (e) {
    }
  }

  useEffect(() => {
    getSubtitles()
  }, [])

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
        src="http://localhost:3000/stream/the_big_bang_theory/subs?lang=fr"
        srcLang="fr"
        label="Français"
        default
        crossOrigin="anonymous"
      />
      {/* <track
        kind="subtitles"
        src="http://localhost:3000/stream/the_big_bang_theory/subs?lang=en"
        srcLang="en"
        label="Anglais"
        crossOrigin="anonymous"
      /> */}
    </video>
  );
};

export default VideoPlayer;
