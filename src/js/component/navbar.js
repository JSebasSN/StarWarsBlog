import React, { useContext } from "react";
import { Link } from "react-router-dom";
import starWarsImage from "../../img/startWars.png";
import { FavoritesContext } from "../store/favoriteContext";

export const Navbar = () => {
	const { favorites, removeFavorites } = useContext(FavoritesContext);

	const handleRemoveFavorite = (uid) => {
		removeFavorites(uid);
	};

	return (
		<nav className="navbar navbar-light bg-light mb-3 px-5 fixed-top">
			<Link to="/">
				<span className="navbar-brand mb-0 h1"><img className="imgLogo" src={starWarsImage} alt="Star Wars Logo" /></span>
			</Link>
			<div className="ml-auto">
				<div className="dropdown">
					<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
						Favorites <span className="badge text-bg-secondary">{favorites.length}</span>
					</button>
					<ul className="dropdown-menu dropdown-menu-end">
						{favorites.length === 0 ? (
							<li className="dropdown-item">No Favorites Yet</li>
						) : (
							favorites.map((fav, index) => (
								<li key={index}>
									<div className="items">
										<Link to={`/info/${fav.uid}`} className="dropdown-item">{fav.name}</Link>
										<span className="trash" onClick={() => handleRemoveFavorite(fav.uid)}>
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
												<path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
											</svg>
										</span>
									</div>

								</li>
							))
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};