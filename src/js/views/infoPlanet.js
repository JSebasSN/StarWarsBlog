import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



export const InfoPlanet = () => {

    const { uid } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCharacterDetail();
    }, [uid]);

    const fetchCharacterDetail = () => {
        fetch(`https://www.swapi.tech/api/planets/${uid}`)
            .then(response => response.json())
            .then(data => {
                setCharacter(data.result.properties);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {character ? (

                <div className='container infoCharacter'>
                    <div className="card text-center">
                        <div className="card-header">
                            {character.name}
                        </div>
                        <div className="cardBody">
                            <img src="https://dummyimage.com/800x600/000/fff" className="imgBody" alt="..." />
                            <p className="card-text">A planet</p>

                        </div>
                        <div className="card-footer text-body-secondary textFooter">
                            <div className='infoCh'>Name <br /> {character.name} </div>
                            <div className='infoCh'>Diameter <br /> {character.diameter} </div>
                            <div className='infoCh'>Rotation Period <br /> {character.rotation_period} </div>
                            <div className='infoCh'>Orbital Period <br /> {character.orbital_period} </div>
                            <div className='infoCh'>Gravity <br /> {character.gravity} </div>
                            <div className='infoCh'>Population <br /> {character.population} </div>
                        </div>
                    </div>
                </div>


            ) : (
                <div>No character data found.</div>
            )}
        </div>
    )
}