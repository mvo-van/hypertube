import GenericPage from "../page/GenericPage";
import { useState } from "react";
import Header from "../../components/header/Header";
import MovieIcon from "../../components/movieIcon/MovieIcon";
import style from "./Feed.module.css"
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import ButtonTrueFalse from "../../components/button/ButtonTrueFalse";

function Feed() {
    const [see, setSee] = useState(true)
    const [notSee, setNotSee] = useState(true)
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

    console.log(movies[0].name)
    console.log("url",movies[0].urlImg)

    const onClickHandlerSee = () => {
        setSee(See => !See)

    }

    const onClickHandlerNotSee = () => {
        setNotSee(notSee => !notSee)
    }


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
                                <ButtonTrueFalse label="Films" color="blue_to_yellow_2" checked={true}/>
                                <ButtonTrueFalse label="Séries" color="blue_to_yellow_2" checked={false}/>
                            </div>
                        </div>
                        <div className={style.size_box}>
                        <Input label="Genre" color="blue_to_yellow_3"/>
                        </div>
                        <div className={style.size_box}>
                        <Input label="Année de sortie" color="yellow"/>
                        </div>
                        <div className={style.size_box}>
                        <Input label="Caste" color="yellow_to_red_1"/>
                        </div>
                        <div className={style.size_box}>
                        <Input label="Realisation" color="yellow_to_red_2"/>
                        </div>
                        <div className={style.size_box}>
                        <Input label="Note" color="yellow_to_red_3"/>
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
