import GenericPage from "../page/GenericPage";
import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import style from "./Users.module.css"
import UserIcon from "../../components/UserIcon/UserIcon";
import { Search } from "@mui/icons-material";
import { matchSorter } from "match-sorter";
import { api } from "../../common/api";

function Users() {
  const [users, setUsers] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [searchUsers, setSearchUsers] = useState([])


  const getAllUsersProfile = async () => {
    try {
      const res = await api.get(`http://localhost:3000/users`);
      setSearchUsers(res.data.map(elem => {
        return ({
          id: elem.id,
          name: elem.username,
          urlImg: elem.profile_picture_url
        })
      }))
      setUsers(res.data.map(elem => {
        return ({
          id: elem.id,
          name: elem.username,
          urlImg: elem.profile_picture_url
        })
      }))
    } catch (e) {
    }
  }

  useEffect(() => {
    getAllUsersProfile()
  }, [])

  const onChangeHeadler = (e) => {
    setSearchValue(e.target.value)
    setSearchUsers(matchSorter(users, e.target.value, { keys: ['name'] }))
  }

  return (
    <GenericPage>
      <Header />
      <div className={style.styleBox}>
        <div className={style.filter}>
          <div className={style.size_box}>
            <input className={style.search} onChange={onChangeHeadler} type="text" />
            <Search className={style.searchIcon} />
          </div>
        </div>
        <div className={style.feed}>
          {searchUsers.map((user, index) => <UserIcon key={user.name + user.id} user={user} color={index % 12} />)}
          {(searchUsers.length == 0) && <div className={style.divNoRes}>Aucun utilisateur ne correspond a votre recherche</div>}
        </div>
      </div>
    </GenericPage>
  );
}

export default Users;
