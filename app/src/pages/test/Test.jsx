import GenericPage from "../page/GenericPage";
import VideoPlayer from "./VideoPlayer";

function Test() {
  const playlist = "static/file.m3u8";
  return (
    <GenericPage>
      <VideoPlayer videoUrl={playlist} thumbnail={thumbnail} />
    </GenericPage>
  );
}

export default Test;
