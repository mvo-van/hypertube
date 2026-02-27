import React, { useEffect, useState } from "react";
import { api } from "../../common/api";

export const VideoPlayer = () => {
  // const thumbnail =
  //   "https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/4a55d5e6-8e3b-4cab-a34c-e8dbe51b5cc2/compose?aspectRatio=1.78&format=webp&width=1200";
  // const [subtitles, SetSubtitles] = useState([]);
  const movie = "http://localhost:3000/stream/imdb/tt0073486";

  const getSubtitles = async () => {
    try {
      // const res = await api.get(`http://localhost:3000/stream/tt0073486/subs`);
      // console.log(res);
    } catch (e) {
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
      <track
        kind="subtitles"
        src="https://www.opensubtitles.com/download/1BC71B511B46C55C176240F33281DCD384473C9BF658041E53DF3F03D86C1D48C14BF65342D78B1CFCA52D7DF11994225ED9993671460A6A55E4938ECF0CEF1E62FDF590F14B4A562751BDFF2E230586CDE437870D46C627BA8754C679EEBC95FA383C17BE7E6D1ED538002E7279C9744531B09E51B1A5FFE6ABC2E5D47175205A225E06D7493F166470CBE7549E52A9B7E2C6EC2BE5ED2AB28D5CAF7BAC7F2A18E982697344824F181F155BCB692D157AEE21FC9C72AD2E9685527AE5B1FD3B56596C41AD7C8BCD2934C1812C03DF6E86AC6FFA899BBEC145A623518462E614A95EE1BA5F3A3F0ADD065CACC9118137B1B976A392988767A7350F97BCE82E604B857A0FB539D33841DE129EE4D0E22AC13DA1E32E8383707EA07BAC0F21819B0527CFA2D4B72EA68ED0A9A0F83B6BDA5999F036C2AB1822145E504841745A984553DD9450C7FBAE/subfile/One.Flew.Over.The.Cuckoos.Nest.1975.1080p.BluRay.x265-RARBG.en.srt"
        srcLang="en"
        label="English"
        default
        crossOrigin="anonymous"
      />
      <track
        kind="subtitles"
        src="https://www.opensubtitles.com/download/1BC71B511B46C55C176240F33281DCD384473C9BF658041E53DF3F03D86C1D48C14BF65342D78B1CFCA52D7DF11994225ED9993671460A6A55E4938ECF0CEF1E62FDF590F14B4A562751BDFF2E230586CDE437870D46C627BA8754C679EEBC95FA383C17BE7E6D1ED538002E7279C9744531B09E51B1A5FFE6ABC2E5D47175205A225E06D7493F166470CBE7549E52A9B7E2C6EC2BE5ED2AB28D5CAF7BAC7F2A18E982697344824F181F155BCB692D157AEE21FC9C72AD2E9685527AE5B1FD3B56596C41AD7C8BCD2934C1812C03DF6E86AC6FFA899BBEC145A623518462E614A95EE1BA5F3A3F0ADD065CACC9118137B1B976A392988767A7350F97BCE82E604B857A0FB539D33841DE129EE4D0E22AC13DA1E32E8383707EA07BAC0F21819B0527CFA2D4B72EA68ED0A9A0F83B6BDA5999F036C2AB1822145E504841745A984553DD9450C7FBAE/subfile/One.Flew.Over.The.Cuckoos.Nest.1975.1080p.BluRay.x265-RARBG.en.srt"
        srcLang="fr"
        label="Francais"
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
