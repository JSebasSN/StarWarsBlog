import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



export const InfoVehicle = () => {

    const { uid } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCharacterDetail();
    }, [uid]);

    const fetchCharacterDetail = () => {
        fetch(`https://www.swapi.tech/api/vehicles/${uid}`)
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
                            <p className="card-text">A vehicle</p>

                        </div>
                        <div className="card-footer text-body-secondary textFooter">
                            <div className='infoCh'>Model <br /> {character.model} </div>
                            <div className='infoCh'>Vehicle Class <br /> {character.vehicle_class} </div>
                            <div className='infoCh'>Manufacturer <br /> {character.manufacturer} </div>
                            <div className='infoCh'>Cost in Credits <br /> {character.cost_in_credits} </div>
                            <div className='infoCh'>Passengers <br /> {character.passengers} </div>
                            <div className='infoCh'>Max Atmospherings Speed <br /> {character.max_atmosphering_speed} </div>
                        </div>
                    </div>
                </div>


            ) : (
                <div>No character data found.</div>
            )}
        </div>
    )
}