import Season from "../season/Season";
import style from "./DivSeasons.module.css";

function DivSeasons({ seasons = []}) {

  return (
    <div className={style.allSeasons}>
      {seasons.length && <div className={`${style.title}`}>Saisons</div>}
      <div className={style.divSeasons}>
        {seasons.length && seasons.map((season, index) => <Season key={season.seasonId} id={season.seasonId} season={season.seasonNbr} date={season.date} poster={season.poster} see={season.see}/>)}
      </div>
    </div>
  );
}

export default DivSeasons;