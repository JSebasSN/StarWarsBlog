import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import { Info } from "./views/info";
import { InfoVehicle } from "./views/infoVehicle";
import { InfoPlanet } from "./views/infoPlanet";
import injectContext from "./store/appContext";
import { FavoritesProvider } from "./store/favoriteContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";



//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<FavoritesProvider>
				<BrowserRouter basename={basename}>
					<ScrollToTop>

						<Navbar />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/demo" element={<Demo />} />
							<Route path="/single/:theid" element={<Single />} />
							<Route path="/info/:uid" element={<Info />} />
							<Route path="/infoVehicle/:uid" element={<InfoVehicle />} />
							<Route path="/infoPlanet/:uid" element={<InfoPlanet />} />
							<Route path="*" element={<h1>Not found!</h1>} />
						</Routes>
						<Footer />

					</ScrollToTop>
				</BrowserRouter>
			</FavoritesProvider>
		</div>
	);
};

export default injectContext(Layout);
