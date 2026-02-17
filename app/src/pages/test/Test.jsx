import GenericPage from "../page/GenericPage";
import VideoPlayer from "./VideoPlayer";

function Test() {
  const playlist = "http://localhost:3000/static/720p.m3u8";
  return (
    <GenericPage>
      <VideoPlayer videoUrl={playlist} />
    </GenericPage>
  );
}

export default Test;
