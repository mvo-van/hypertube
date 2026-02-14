import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import "./palette/colors.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Feed from "./pages/feed/Feed";
import Users from "./pages/users/Users";
import ProfileUser from "./pages/profileUser/ProfileUser";
import MoviePage from "./pages/moviePage/MoviePage";
import Settings from "./pages/settings/Settings";
import ValidateSignup from "./pages/validateSignup/ValidateSignup";
import { AuthProvider } from "./context/userContext";
import Error404 from "./pages/error404/Error404";
import SeriePage from "./pages/seriePage/SeriePage";
import SeasonPage from "./pages/seasonPage/SeasonPage";
import EpisodePage from "./pages/episodePage/EpisodePage";


function App() {
	return (
		<BrowserRouter>
			<link
				rel="stylesheet"
				type="text/css"
				href="//fonts.googleapis.com/css?family=Amatic+SC"
			/>
			<link
				rel="stylesheet"
				type="text/css"
				href="//fonts.googleapis.com/css2?family=Basic&display=swap"
			/>
			<AuthProvider>

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route
						path="/validate-signup"
						element={<ValidateSignup />}
					/>
					<Route path="/feed" element={<Feed />} />
					<Route path="/users" element={<Users />} />
					<Route path="/user/:id" element={<ProfileUser />} />
					<Route path="/movie/:id" element={<MoviePage />} />
					<Route path="/serie/:id" element={<SeriePage />} />
					<Route path="/serie/:serie_id/season/:season_number" element={<SeasonPage />} />
					<Route path="/serie/:serie_id/season/:season_number/episode/:episode_number" element={<EpisodePage />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/test" element={<ProfileUser />} />
					<Route path="*" element={<Error404 />} />
				</Routes>

			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
