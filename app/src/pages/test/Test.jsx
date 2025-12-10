import GenericPage from "../page/GenericPage";
import startTrek from "../../assets/videos/output.mp4";
import startTrekSubs from "../../assets/videos/subs.vtt";
// import favicon from '../../assets/images/logo.png'

function Test() {
  return (
    <GenericPage>
      {/* <!-- Video.js base CSS -->*/}
      <link
        href="https://unpkg.com/video.js@7/dist/video-js.min.css"
        rel="stylesheet"
      />

      {/* <!-- City -->*/}
      <link
        href="https://unpkg.com/@videojs/themes@1/dist/city/index.css"
        rel="stylesheet"
      />

      <video controls width="1000" height="700">
        <source src={startTrek} type="video/mp4"></source>
        <track
          default
          kind="captions"
          src={startTrekSubs}
          srcLang="fr"
          label="Français"
        />
      </video>
    </GenericPage>
  );
}

export default Test;
