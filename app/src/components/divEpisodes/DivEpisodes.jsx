import Episode from "../episode/Episode";
import style from "./DivEpisodes.module.css";

function DivEpisodes({ episodes = []}) {

  return (
    <div className={style.allEpisodes}>
      {episodes.length && <div className={`${style.title}`}>Episodes</div>}
      <div className={style.divSeasons}>
        {episodes.length && episodes.map((episode, index) => <Episode key={index} episode={episode}/>)}
      </div>
    </div>
  );
}

export default DivEpisodes;