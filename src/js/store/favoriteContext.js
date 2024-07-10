import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (character) => {
        setFavorites((prevFavorites) => {
            // Evita agregar duplicados
            if (!prevFavorites.some(fav => fav.uid === character.uid)) {
                return [...prevFavorites, character];
            }
            return prevFavorites;
        });
    };

    const removeFavorites = (uid) => {
        setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.uid !== uid));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};