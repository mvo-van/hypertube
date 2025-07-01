import GenericPage from "../page/GenericPage";
import { useState } from "react";
import Header from "../../components/header/Header";
import style from "./ProfileUser.module.css"
import {useNavigate, useParams} from "react-router-dom";
import UserInfo from "../../components/UserInfo/UserInfo";

function ProfileUser() {
    const {id} = useParams();

    const [user, setUsers] = useState(
        {"id":1,"pseudo":"augustes", "firstName":"george","lastName":"sanderson","urlImg":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg", "moviesNumber":120, "seriesNumber":40}
    );


    return (
        <GenericPage>
                <Header />
                <div className={style.user}>
                    <UserInfo user={user}/>
                </div>
        </GenericPage>
    );
}

export default ProfileUser;
