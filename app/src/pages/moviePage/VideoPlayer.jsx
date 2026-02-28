import React, { useEffect, useState } from "react";
import { api } from "../../common/api";

export const VideoPlayer = (imdbID) => {
  // const thumbnail =
  //   "https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/4a55d5e6-8e3b-4cab-a34c-e8dbe51b5cc2/compose?aspectRatio=1.78&format=webp&width=1200";
  const [subtitles, setSubtitles] = useState([]);

  const movie = `http://localhost:3000/stream/imdb/${imdbID}`;

  const getSubtitles = async () => {
    try {
      const res = await api.get(`http://localhost:3000/stream/${imdbID}/subs`);

      setSubtitles(res.data.subtitles);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getSubtitles();
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
      {subtitles.reverse().map((e, index) =>
        <track
          kind="subtitles"
          src={e.src}
          srcLang={e.lang}
          label={e.lang}
          default={index == 0}
          key={index}
          crossOrigin="anonymous"
        />
      )}
    </video>
  );
};

export default VideoPlayer;
