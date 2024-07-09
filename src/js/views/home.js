import React from "react";
import "../../styles/home.css";
import { CardCharacter } from "../component/cardCharacter";
import { CardPlanet } from "../component/cardPlanet";
import { CardVehicle } from "../component/cardVehicle";


export const Home = () => (
	<div className="container mt-5 pt-5">

		<h2>Characters</h2>
		<div className="rollCardsBox">
			<CardCharacter />
		</div>

		<h2>Planets</h2>
		<div className="rollCardsBox">
			<CardPlanet />
		</div>

		<h2>Vehicles</h2>
		<div className="rollCardsBox">
			<CardVehicle />
		</div>
	</div>
);
