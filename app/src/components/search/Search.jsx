import Form from "../../components/form/Form";
import Input from "../input/Input";
import InputRange from "../input/InputRange";
import InputTags from "../input/InputTags";
import InputChoice from "../input/InputChoice";
import ButtonTrueFalse from "../button/ButtonTrueFalse";
import style from "./Search.module.css";
import { useEffect, useState } from "react";
import Button from "../button/Button";

export default function Search({ open }) {
	const [searching, setSearching] = useState(open);
	const [watched, setWatched] = useState(false);
	const [downloaded, setDownloaded] = useState(false);
	const [serie, setSerie] = useState(true);
	const [movie, setMovie] = useState(true);
	const [note, setNote] = useState(0);
	const [range, setRange] = useState([1900, 2025]);

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
		setNote(e);
	};

	const handleChangeRange = (event, newValue, activeThumb) => {
		if (activeThumb === 0) {
			setRange([Math.min(newValue[0], range[1] - 0), range[1]]);
		} else {
			setRange([range[0], Math.max(newValue[1], range[0] + 0)]);
		}
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
				<Form label="rechercher" color="red" direction="row">
					<div className={style.form}>
						<div className={style.childBox}>
							{/* <Input label="Titre" /> */}
							<InputTags
								label="Titre"
							/>

							<InputRange
								double={true}
								label="Année"
								min={1900}
								max={2025}
								value={range}
								onChange={handleChangeRange}
							/>
						</div>
						<div className={style.childBox}>
							<InputTags label="Genre" />

							<InputTags
								label="Distribution"
							/>
						</div>
						<div className={style.childBox}>
							<InputTags
								label="Réalisateur"
							/>

							<InputTags
								label="Producteur"
							/>
						</div>
						<div className={style.childBox}>
							<InputRange
								label="Note minimale"
								value={note}
								onChange={onChangeHandlerNote}
							/>

							{/* <InputChoice 
								label="Type"
							/> */}
							<InputTags
								label="Type"
							/>
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
