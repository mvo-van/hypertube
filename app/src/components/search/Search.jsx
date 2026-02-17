import Form from "../../components/form/Form";
import Input from "../input/Input";
import InputRange from "../input/InputRange";
import InputTags from "../input/InputTags";
import InputChoice from "../input/InputChoice";
import ButtonTrueFalse from "../button/ButtonTrueFalse";
import style from "./Search.module.css";
import { useEffect, useState } from "react";
import Button from "../button/Button";
import { useParams, useSearchParams } from "react-router";
import InputSelect from "../input/InputSelect";
import InputSoloText from "../input/InputSoloText";

export default function Search({ open }) {
	const [searchParams, setSearchParams] = useSearchParams();

	const [title, setTitle] = useState("")
	const [minYear, setMinYear] = useState(1900)
	const [maxYear, setMaxYear] = useState(2025)
	const [genre, setGenre] = useState([])
	const [distribution, setDistribution] = useState([])
	const [director, setDirector] = useState([])
	const [producer, setProducer] = useState([])
	const [noteMinimale, setNoteMinimal] = useState(0)
	const [type, setType] = useState("")
	const [watched, setWatched] = useState(false);
	const [downloaded, setDownloaded] = useState(false);

	const [searching, setSearching] = useState(open);
	// const [serie, setSerie] = useState(true);
	// const [movie, setMovie] = useState(true);
	// const [note, setNote] = useState(0);
	// const [range, setRange] = useState([1900, 2025]);

	const [isOnSearch, setIsOnSearch] = useState(false)

	const [listGenre, setListGenre] = useState(["action", "aventures", "anticipation", "catastrophe", "noel"])
	const [listMovies, setListMovies] = useState([{ "inputValue": "action" }, { "inputValue": "aventures" }, { "inputValue": "anticipation" }, { "inputValue": "catastrophe" }, { "inputValue": "noel" }])


	useEffect(() => {
		if (searchParams.get("Titre")) {
			setTitle(searchParams.get("Titre"))
			setIsOnSearch(true)
		}
		if (searchParams.get("minYear")) {
			setMinYear(Number(searchParams.get("minYear")))
			setIsOnSearch(true)
		}
		if (searchParams.get("maxYear")) {
			setMaxYear(Number(searchParams.get("maxYear")))
			setIsOnSearch(true)
		}
		if (searchParams.get("genre")) {
			setGenre(searchParams.get("genre").split(","))
			setIsOnSearch(true)
		}
		if (searchParams.get("distribution")) {
			setDistribution(searchParams.get("distribution").split(","))
			setIsOnSearch(true)
		}
		if (searchParams.get("director")) {
			setDirector(searchParams.get("director").split(","))
			setIsOnSearch(true)
		}
		if (searchParams.get("producer")) {
			setProducer(searchParams.get("producer").split(","))
			setIsOnSearch(true)
		}
		if (searchParams.get("Note_minimale")) {
			setNoteMinimal(Number(searchParams.get("Note_minimale")))
			setIsOnSearch(true)
		}
		if (searchParams.get("type")) {
			setType(searchParams.get("type"))
			setIsOnSearch(true)
		}
		if (searchParams.get("watched") !== undefined) {
			setWatched(searchParams.get("watched") === "true")
			setIsOnSearch(true)
		}
		if (searchParams.get("downloaded") !== undefined) {
			setDownloaded(searchParams.get("downloaded") === "true")
			setIsOnSearch(true)
		}
	}, []);


	useEffect(() => {
	}, [genre]);

	const openSearch = () => {
		setSearching((searching) => !searching);
	};

	const onClickHandlerWatched = () => {
		setWatched((watch) => !watch);
	};

	const onClickHandlerDownloaded = () => {
		setDownloaded((download) => !download);
	};

	const onChangeHandlerNote = (e) => {
		setNoteMinimal(e);
	};

	const onChangeHandlerTitle = (e, value) => {
		if (value) {
			setTitle(value.inputValue);
		}
		else {
			setTitle("")
		}
	};

	const onChangeBlurTitle = (e) => {
		setTitle(e.target.value);
	};

	const onChangeHandlerGenre = (e, value) => {
		setGenre(value);
	};
	const onChangeHandlerDistribution = (e, value) => {
		setDistribution(value);
	};
	const onChangeHandlerDirector = (e, value) => {
		setDirector(value);
	};
	const onChangeHandlerProducer = (e, value) => {
		setProducer(value);
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

	const onSubmit = (event) => {
		var search = {
			"title": title,
			"minYear": minYear,
			"maxYear": maxYear,
			"genre": genre,
			"distribution": distribution,
			"director": director,
			"producer": producer,
			"note": noteMinimale,
			"type": type,
			"watch": watched,
			"downloaded": downloaded
		}
		event.preventDefault();
	};

	return (
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
							{/* <Input label="Titre" /> */}
							<InputSoloText
								label="Titre"
								value={title}
								onChange={onChangeHandlerTitle}
								options={listMovies}
								onBlur={onChangeBlurTitle}
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
						<div className={style.childBox}>
							<InputTags
								label="Genre"
								value={genre}
								options={listGenre}
								onChange={onChangeHandlerGenre} />

							<InputTags
								label="Distribution"
								value={distribution}
								options={[]}
								onChange={onChangeHandlerDistribution}
							/>
						</div>
						<div className={style.childBox}>
							<InputTags
								label="Réalisateur"
								value={director}
								options={[]}
								onChange={onChangeHandlerDirector}
							/>

							<InputTags
								label="Producteur"
								value={producer}
								options={[]}
								onChange={onChangeHandlerProducer}
							/>
						</div>
						<div className={style.childBox}>
							<InputRange
								label="Note minimale"
								value={noteMinimale}
								onChange={onChangeHandlerNote}
							/>

							{/* <InputChoice 
								label="Type"
							/> */}
							<InputSelect label="Type"
								value={type}
								options={[{ "label": "serie", "name": "Série" }, { "label": "movie", "name": "Film" }]}
								onChange={onChangeHandlerType}
							/>
							{/* <InputTags
								label="Type"
							/> */}
						</div>
						<div className={`${style.childBox} ${style.trueFalse}`}>
							<ButtonTrueFalse
								label="Vu"
								checked={watched}
								onClick={onClickHandlerWatched}
							/>

							<ButtonTrueFalse
								label="Téléchargé"
								checked={downloaded}
								onClick={onClickHandlerDownloaded}
							/>
						</div>
						{/* <Input label="Utilisateur" color="blue"/> */}
					</div>
				</Form>
			)}
		</div>
	);
}
