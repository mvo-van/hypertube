import GenericPage from "../page/GenericPage";
import VideoPlayer from "./VideoPlayer";

function Test() {
  const playlist = "http://localhost:3000/stream/master.m3u8";
  const thumbnail =
    "https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/4a55d5e6-8e3b-4cab-a34c-e8dbe51b5cc2/compose?aspectRatio=1.78&format=webp&width=1200";

  return (
    <GenericPage>
      <VideoPlayer videoUrl={playlist} thumbnail={thumbnail} />
    </GenericPage>
  );
}

export default Test;
