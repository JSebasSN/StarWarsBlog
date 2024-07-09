import React from "react";
import { useState, useEffect } from "react";
import LukeSkywalker from "../../img/Luke.jpg"

export const CardCharacter = () => {

    const [character, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchGetCharacters()
    }, []);

    const fetchGetCharacters = () => {
        fetch("https://www.swapi.tech/api/people/")
            .then((response) => response.json())
            .then((data) => {
                const characterPromises = data.results.map((characterItem) =>
                    fetchGetInfoCharacter(characterItem.uid).then((info) => ({
                        ...characterItem,
                        info,
                    }))
                );
                Promise.all(characterPromises).then((characters) => {
                    setCharacters(characters);
                    setLoading(false); // Indica que la carga ha terminado
                });
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };



    const fetchGetInfoCharacter = (uid) => {
        return fetch(`https://www.swapi.tech/api/people/${uid}`)
            .then((response) => response.json())
            .then((data) => data.result.properties)
            .catch((error) => {
                console.log(error);
                return {};
            });
    }

    const getRandomImage = () => {
        // Genera un número aleatorio entre 1 y 1000 para obtener imágenes diferentes
        const randomNumber = Math.floor(Math.random() * 1000) + 1;
        return `https://picsum.photos/400/350?random=${randomNumber}`;
    };

    if (loading) {
        return <div>Cargando información...</div>; // Mostrar un indicador de carga
    }

    return (
        <div className="rollCards">
            {character.map((characterItem, i) => (
                <div className="card m-4" style={{ width: '18rem' }} key={i}>
                    <img src={getRandomImage()} className="card-img-top" alt="..." />
                    <div className="card-body" >
                        <h5 className="card-title">{characterItem.name}</h5>
                        <p className="card-text" >
                            Gender: {characterItem.info?.gender}
                            <br />
                            Hair Color: {characterItem.info?.hair_color}
                            <br />
                            Eye Color: {characterItem.info?.eye_color}
                        </p>
                        <div className="btns">
                            <a href="#" className="btn btn-outline-primary">Go somewhere</a><span />
                            <a className="fav"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                            </svg></a>
                        </div>

                    </div>
                </div>
            ))
            }

        </div>
    )
}
