import GenericPage from "../page/GenericPage";
import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import MovieIcon from "../../components/movieIcon/MovieIcon";
import style from "./Users.module.css"
import Input from "../../components/input/Input";
import UserIcon from "../../components/UserIcon/UserIcon";
import { Search } from "@mui/icons-material";
import { matchSorter } from "match-sorter";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [searchUsers, setSearchUsers] = useState([])
  
  
  const getAllUsersProfile = async() =>{
    const config = { withCredentials: true };
    try {
      const res = await axios.get(`http://localhost:3000/users`, config);
      console.log(res)
      setSearchUsers(res.data.map(elem => {
        return({id : elem.id,
          name:elem.username,
          urlImg:elem.profile_picture_url})
      }))
      setUsers(res.data.map(elem => {
        return({id : elem.id,
          name:elem.username,
          urlImg:elem.profile_picture_url})
      }))
    } catch (e) {
    }
  }

  useEffect(()=>{
    getAllUsersProfile()
  },[])
  
  const onChangeHeadler = (e) => {
    setSearchValue(e.target.value)
    setSearchUsers(matchSorter(users, e.target.value, {keys: ['name']}))
  }

  return (
    <GenericPage>
      <Header />
      <div className={style.styleBox}>
        <div className={style.filter}>
          <div className={style.size_box}>
            <input className={style.search} onChange={onChangeHeadler} type="text"/>
            <Search className={style.searchIcon}/>
          </div>
        </div>
        <div className={style.feed}>
          {searchUsers.map((user, index) => <UserIcon key={user.name + user.id} user={user} color={index%12}/>)}
          {(searchUsers.length == 0) && <div className={style.divNoRes}>Aucun utilisateur ne correspond a votre recherche</div>}
        </div>
      </div>
    </GenericPage>
  );
}

export default Users;
