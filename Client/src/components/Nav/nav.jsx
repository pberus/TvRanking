import logo from "../../assets/logo_tv_ranking.png"
import SearchBar from "../SearchBar/searchBar"
import style from "./nav.module.css"

const Nav = () => {
    return <div className={style.Nav}>
        <a href="/">
            <img src={logo} alt="logo tv ranking" height="60" width="60"/>
        </a>
        <a href="/">
            <p>Inicio</p>
        </a>
        <a href="/popular">
            <p>Popular</p>
        </a>
        <a href="/listas">
            <p>Listas</p>
        </a>
        <a href="/ranking">
            <p>Ranking</p>
        </a>
        <SearchBar />
    </div>
}

export default Nav