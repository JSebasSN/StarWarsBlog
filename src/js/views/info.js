import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



export const Info = () => {

    const { uid } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCharacterDetail();
    }, [uid]);

    const fetchCharacterDetail = () => {
        fetch(`https://www.swapi.tech/api/people/${uid}`)
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
                            <p className="card-text">A person within the Star Wars universe</p>

                        </div>
                        <div className="card-footer text-body-secondary textFooter">
                            <div className='infoCh'>Name <br /> {character.name} </div>
                            <div className='infoCh'>Birth Year <br /> {character.birth_year} </div>
                            <div className='infoCh'>Gender <br /> {character.gender} </div>
                            <div className='infoCh'>Height <br /> {character.height} </div>
                            <div className='infoCh'>Skin Color <br /> {character.skin_color} </div>
                            <div className='infoCh'>Eye Color <br /> {character.eye_color} </div>
                        </div>
                    </div>
                </div>


            ) : (
                <div>No character data found.</div>
            )}
        </div>
    )
}