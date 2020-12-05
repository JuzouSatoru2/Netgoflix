import { useState } from 'react';

export const Favourites = ({ initialState = false, movieName }) => {
  const [isFavourite, setIsFavourite] = useState(initialState);

  if (!localStorage.getItem('favourites')) {
    localStorage.setItem('favourites', '');
  }

  function addToFavourites() {
    const currentFavourites = localStorage.getItem('favourites');
    localStorage.setItem('favourites', `${currentFavourites},${movieName}`);
    setIsFavourite(true);
  }

  function removeFromFavourites() {
    const currentFavourites = localStorage.getItem('favourites');
    const newFavourites = currentFavourites.replace(`,${movieName}`, '');
    localStorage.setItem('favourites', `${newFavourites}`);
    setIsFavourite(false);
  }

  if (isFavourite) {
    return (
      <button
        type="button"
        className="btn btn-danger"
        onClick={removeFromFavourites}>
        Remove from favourites
      </button>
    );
  }

  return (
    <button type="button" className="btn btn-success" onClick={addToFavourites}>
      Add to favourites
    </button>
  );
};
