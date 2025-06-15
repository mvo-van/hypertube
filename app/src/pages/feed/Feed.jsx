import GenericPage from "../page/GenericPage";
import { useState } from "react";
import Header from "../../components/header/Header";
import MovieIcon from "../../components/movieIcon/MovieIcon";
import style from "./Feed.module.css"
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import ButtonTrueFalse from "../../components/button/ButtonTrueFalse";
import InputRange from "../../components/input/InputRange";
import InputTags from "../../components/input/InputTags";

function Feed() {
    const [see, setSee] = useState(true)
    const [notSee, setNotSee] = useState(true)
    const [serie, setSerie] = useState(true)
    const [movie, setMovie] = useState(true)
    const [note, setNote] = useState(0)
    const [movies, setMovies] = useState([{"id":1,"name":"lilo & Stitch", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
        {"id":1,"name":"lilo & Stitch", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
        {"id":1,"name":"lilo & Stitch", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
        {"id":1,"name":"lilo & Stitch", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
        {"id":1,"name":"lilo & Stitch", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
        {"id":1,"name":"lilo & Stitch", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
        {"id":1,"name":"lilo & Stitch", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
        {"id":1,"name":"lilo & Stitch", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
        {"id":1,"name":"lilo & Stitch", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
        {"id":1,"name":"lilo & Stitch", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
        {"id":1,"name":"lilo & Stitch", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
        {"id":1,"name":"lilo & Stitch", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
        {"id":1,"name":"lilo & Stitch", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
        {"id":1,"name":"lilo & Stitch", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
        {"id":1,"name":"lilo & Stitch", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
        {"id":1,"name":"lilo & Stitch", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
        {"id":1,"name":"lilo & Stitch", "urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "see":true},
    ]);
    const [range, setRange] = useState([1900, 2025])
    console.log(movies[0].name)
    console.log("url",movies[0].urlImg)

    const onClickHandlerSee = () => {
        setSee(See => !See)
    }

    const onClickHandlerNotSee = () => {
        setNotSee(notSee => !notSee)
    }

    const onClickHandlerMovie = () => {
        setMovie(movie => !movie)
    }

    const onClickHandlerSerie = () => {
        setSerie(serie => !serie)
    }
    const onChangeHandlerNote = (e) => {
        setNote(e)
    }

    const handleChangeRange = (event, newValue, activeThumb) => {
        if (activeThumb === 0) {
        setRange([Math.min(newValue[0], range[1] - 0), range[1]]);
        } else {
        setRange([range[0], Math.max(newValue[1], range[0] + 0)]);
        }
    };

    return (
        <GenericPage>
                <Header />
                <div className={style.filter}>
                    <Form label="recherche" color="red" direction="row"> 
                        <div className={style.size_box}>
                            <Input label="Titre" color="blue"/>
                        </div>
                        <div className={style.size_box}>
                            <div className={style.boxTrueFalse}>
                                <ButtonTrueFalse label="Deja Vu" color="blue_to_yellow_1" checked={see} onClick={onClickHandlerSee}/>
                                <ButtonTrueFalse label="Jamais Vu" color="blue_to_yellow_1" checked={notSee} onClick={onClickHandlerNotSee}/>
                            </div>
                        </div>
                        <div className={style.size_box}>
                            <div className={style.boxTrueFalse}>
                                <ButtonTrueFalse label="Films" color="blue_to_yellow_2" checked={movie} onClick={onClickHandlerMovie}/>
                                <ButtonTrueFalse label="Séries" color="blue_to_yellow_2" checked={serie} onClick={onClickHandlerSerie} />
                            </div>
                        </div>
                        <div className={style.size_box}>
                            <Input label="Genre" color="blue_to_yellow_3"/>
                        </div>
                        <div className={style.size_box}>
                            <InputRange double={true} label="Année de sortie" color="yellow" min={1900} max={2025} value={range} onChange={handleChangeRange}/>
                        </div>
                        <div className={style.size_box}>
                            <Input label="Caste" color="yellow_to_red_1"/>
                        </div>
                        <div className={style.size_box}>
                            <div className={style.ralisationTitle}>
                                Realisation
                            </div>
                            <InputTags label="Realisation" color="yellow_to_red_2"/>
                        </div>
                        <div className={style.size_box}>
                            <InputRange label="Note" color="yellow_to_red_3" value={note} onChange={onChangeHandlerNote}/>
                        </div>
                    </Form>
                </div>
                <div className={style.feed}>
                    {movies.map((movie, index) => <MovieIcon key={movie.name + movie.id} movie={movie} color={index%12}/>)}
                </div>
                

        </GenericPage>
    );
}

export default Feed;
