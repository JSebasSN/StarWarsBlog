import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../store/favoriteContext";

export const CardPlanet = () => {

    const [planets, setplanetss] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addFavorite } = useContext(FavoritesContext);


    useEffect(() => {
        fetchGetplanetss()
    }, []);

    const fetchGetplanetss = () => {
        fetch("https://www.swapi.tech/api/planets/")
            .then((response) => response.json())
            .then((data) => {
                const planetsPromises = data.results.map((planetsItem) =>
                    fetchGetInfoplanets(planetsItem.uid).then((info) => ({
                        ...planetsItem,
                        info,
                    }))
                );
                Promise.all(planetsPromises).then((planetss) => {
                    setplanetss(planetss);
                    setLoading(false); // Indica que la carga ha terminado
                });
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };



    const fetchGetInfoplanets = (uid) => {
        return fetch(`https://www.swapi.tech/api/planets/${uid}`)
            .then((response) => response.json())
            .then((data) => data.result.properties)
            .catch((error) => {
                console.log(error);
                return {};
            });
    }




    if (loading) {
        return <div>Cargando información...</div>; // Mostrar un indicador de carga
    }

    return (
        <div className="rollCards">
            {planets.map((planetsItem, i) => (
                <div className="card m-4" style={{ width: '18rem' }} key={i}>
                    <img src="https://dummyimage.com/400x350/000/fff" className="card-img-top" alt="..." />
                    <div className="card-body" >
                        <h5 className="card-title">{planetsItem.name}</h5>
                        <p className="card-text" >
                            Population: {planetsItem.info?.population}
                            <br />
                            Terrain: {planetsItem.info?.terrain}
                            <br />
                        </p>
                        <div className="btns">
                            <Link to={`/infoPlanet/${planetsItem.uid}`} className="btn btn-outline-primary">Learn More</Link>
                            <a className="fav" onClick={() => addFavorite(planetsItem)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                            </svg></a>
                        </div>
                    </div>
                </div>
            ))
            }

        </div>
    )
}
