import GenericPage from "../page/GenericPage";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import HorizontalScrollMovies from "../../components/horizontalScrollMovies/HorizontalScrollMovies";
import { api } from "../../common/api";
import style from "./Feed.module.css";
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import FeedMovies from "../../components/feedMovies/FeedMovies";
import { CircularProgress } from "@mui/material";
import InputSelect from "../../components/input/InputSelect";
import Form from "../../components/form/Form";
import InputRange from "../../components/input/InputRange";
import Button from "../../components/button/Button";

function Feed() {
	const [minYear, setMinYear] = useState(1900)
	const [maxYear, setMaxYear] = useState(2025)
	const [genre, setGenre] = useState("")
	const [tri, setTri] = useState("titre")
	const [noteMinimale, setNoteMinimal] = useState(0)
	const [type, setType] = useState("movie")
	const [searching, setSearching] = useState(false);
	const [listGenre, setListGenre] = useState([])
	const [movies, setMovies] = useState([]);
	const [series, setSeries] = useState([]);
	const [searchTitle, setSearchTitle] = useState("")
	const [curentSearch, setCurentSearch] = useState("")
	const [isSearchOff, setIsSearchOff] = useState(true)
	const [resSearch, setResSearch] = useState([])
	const [page, setPage] = useState(1)
	const [pageToCharge, setPageToCharge] = useState(1)

	const openSearch = () => {
		setSearching((searching) => !searching);
	};

	const onChangeHandlerNote = (e) => {
		setNoteMinimal(e);
	};

	const onChangeHandlerGenre = (e) => {
		setGenre(e.target.value);
	};
	const onChangeHandlerTri = (e) => {
		setTri(e.target.value);
	};

	const onChangeHandlerType = (e) => {
		setType(e.target.value);
	};
	const handleChangeRange = (event, newValue, activeThumb) => {
		if (activeThumb === 0) {
			setMinYear(Math.min(newValue[0], maxYear - 0));
		} else {
			setMaxYear(Math.max(newValue[1], minYear + 0));
		}
	};

	const handleScroll = async () => {
		const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
		if (bottom) {
			if (page < pageToCharge) {
				const res = await api.get(`${curentSearch}&page=${page + 1}`);
				setResSearch(resSearch.concat(res.data.resultSearch))
				setPage(page + 1)
			}
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, {
			passive: true
		});
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [pageToCharge, page, curentSearch]);


	const getTop = async () => {
		try {
			const res = await api.get(`movies/top/MovieSerie`);
			setMovies(res.data.topMovie)
			setSeries(res.data.topSerie)
		} catch (e) {
		}
	}


	const getGenre = async () => {
		try {
			const res = await api.get(`movies/get/genre`);
			console.log(res.data)
			setListGenre(res.data)
		} catch (e) {
		}
	}

	useEffect(() => {
		getTop()
		getGenre()
	}, [])

	const onSubmit = async (e) => {
		e.preventDefault();
		setIsSearchOff(false)
		setCurentSearch(`http://localhost:3000/movies/search/byFilter?minYear=${minYear}&maxYear=${maxYear}&genre=${genre}&note=${noteMinimale}&type=${type}&tri=${tri}`)
		const res = await api.get(`http://localhost:3000/movies/search/byFilter?minYear=${minYear}&maxYear=${maxYear}&genre=${genre}&note=${noteMinimale}&type=${type}&tri=${tri}&page=${1}`);
		setPage(1)
		setResSearch(res.data.resultSearch)
		setPageToCharge(res.data.total_pages)
	};

	const onTitleSearchSubmit = async (e) => {
		e.preventDefault();
		console.log("here")
		if (searchTitle.length) {
			setIsSearchOff(false)
			setCurentSearch(`http://localhost:3000/movies/search/byName?query=${searchTitle}`)
			const res = await api.get(`http://localhost:3000/movies/search/byName?query=${searchTitle}&page=${1}`);
			setPage(1)
			setResSearch(res.data.resultSearch)
			setPageToCharge(res.data.total_pages)
		} else {
			setIsSearchOff(true)
		}
	}

	const onTitleSearchHeandler = (e) => {
		setSearchTitle(e.target.value)
		if (e.target.value.length == 0) {
			setIsSearchOff(true)
		}
	}
	return (
		<GenericPage>
			<Header />
			<div className={style.search}>
				<Button
					className={style.searchTitle}
					onClick={openSearch}
					children="Recherche"
					color="blue"
				/>
				{searching == true && (
					<Form label="rechercher" color="red" direction="row" onSubmit={onSubmit}>
						<div className={style.form}>
							<div className={style.childBox}>
								<InputSelect label="Genre"
									value={genre}
									options={listGenre}
									onChange={onChangeHandlerGenre}
									selectVoid={true}
								/>
								<InputSelect label="Tri"
									value={tri}
									options={[{ "label": "titre", "name": "titre" }, { "label": "note", "name": "note" }, { "label": "date", "name": "date" }]}
									onChange={onChangeHandlerTri}
									selectVoid={false}
								/>

							</div>
							<div className={style.childBox}>
								<InputRange
									label="Note minimale"
									value={noteMinimale}
									onChange={onChangeHandlerNote}
								/>
								<InputRange
									double={true}
									label="Année"
									min={1900}
									max={2025}
									value={[minYear, maxYear]}
									onChange={handleChangeRange}
								/>
							</div>
							<div className={`${style.childBox} ${style.trueFalse}`}>

								<InputSelect label="Type"
									value={type}
									options={[{ "label": "tv", "name": "Série" }, { "label": "movie", "name": "Film" }]}
									onChange={onChangeHandlerType}
									selectVoid={false}
								/>
							</div>
						</div>
					</Form>
				)}
			</div>
			{!searching && <form className={style.formTile} onSubmit={onTitleSearchSubmit}>
				<input type="textarea" className={style.inputTitle} value={searchTitle} onChange={onTitleSearchHeandler} />
				<button
					type="submit"
					className={style.buttonTitle}>
					<SavedSearchIcon className={style.icon} fontSize="large" />
				</button>
			</form>}
			{isSearchOff && <HorizontalScrollMovies
				movies={movies}
				label="Top 20 - Films les plus populaires"
			/>}
			{isSearchOff && <HorizontalScrollMovies
				movies={series}
				label="Top 20 - Series les plus populaires"
			/>}
			{!isSearchOff && <FeedMovies
				movies={resSearch}
			/>}
			{(page < pageToCharge) && <div className={style.charge}><CircularProgress color="inherit" size="3rem" /></div>}


		</GenericPage>
	);
}

export default Feed;
