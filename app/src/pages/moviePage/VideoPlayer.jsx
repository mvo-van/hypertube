import { useEffect, useState, useRef } from "react";
import { api } from "../../common/api";
import style from "./VideoPlayer.module.css";
import { checkAuthConnected } from "../../common/checkAuth";

export const VideoPlayer = ({ imdbID, tmdbID, subtitlesAuto = false, startTime, runTime }) => {
  const [subtitles, setSubtitles] = useState([]);
  const movie = `http://localhost:3000/stream/imdb/${imdbID}`;
  const videoPlayerRef = useRef(null);

  const getSubtitles = async () => {
    try {
      if (imdbID) {
        const resAuthConnected = await checkAuthConnected();
        if (resAuthConnected) {
          const res = await api.get(`/stream/${imdbID}/subs`);
          setSubtitles(res.data.subtitles);
        }
      }
    } catch (e) { }
  }

  useEffect(() => {
    getSubtitles();

    if (videoPlayerRef.current) {
      videoPlayerRef.current.currentTime = startTime;
    }

    const intervalId = setInterval(() => {
      if (videoPlayerRef.current) {
        const currentTime = videoPlayerRef.current.currentTime;

        if ((runTime - 4) <= Math.floor(currentTime / 60)) {
          api.post("/watched/timeWatchedUpdate", {
            movie_id: tmdbID,
            movieType: 'movie',
            time: 0
          });
          api.post(`/watched/addWatch`, {
            "movieType": 'movie',
            "movie_id": tmdbID
          });
        } else {
          api.post("/watched/timeWatchedUpdate", {
            movie_id: tmdbID,
            movieType: 'movie',
            time: Math.floor(currentTime)
          });
        }

      }

    }, 5000);

    return () => { clearInterval(intervalId) }
  }, [imdbID])

  return (
    <video className={style.videoPlayer}
      src={movie}
      controls
      preload="auto"
      autoPlay
      crossOrigin="anonymous"
      ref={videoPlayerRef}
    >
      {subtitles.reverse().map((e, index) =>
        <track
          kind="subtitles"
          src={e.src}
          srcLang={e.lang}
          label={e.lang}
          default={index == 0 && subtitlesAuto}
          key={index}
          crossOrigin="anonymous"
        />
      )}
    </video>
  );
};

export default VideoPlayer;
