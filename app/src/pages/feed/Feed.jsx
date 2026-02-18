import GenericPage from "../page/GenericPage";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import HorizontalScrollMovies from "../../components/horizontalScrollMovies/HorizontalScrollMovies";
import Search from "../../components/search/Search";
import { api } from "../../common/api";

function Feed() {
	const [movies, setMovies] = useState([]);
	const [series, setSeries] = useState([]);
	const getTop = async () => {
		try {
			const res = await api.get(`movies/top/MovieSerie`);
			setMovies(res.data.topMovie)
			setSeries(res.data.topSerie)
		} catch (e) {
		}
	}

	useEffect(() => {
		getTop()
	}, [])
	return (
		<GenericPage>
			<Header />
			<Search open={true} />
			<HorizontalScrollMovies
				movies={movies}
				label="Top 20 - Films les plus populaires"
			/>
			<HorizontalScrollMovies
				movies={series}
				label="Top 20 - Series les plus populaires"
			/>
		</GenericPage>
	);
}

export default Feed;
