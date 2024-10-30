// components/AddToWatchlistButton.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../redux/slices/movieSlice';

export default function AddToWatchlistButton({ movie }) {


  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToWatchlist(movie));
  };

  const handleRemove = () => {
    dispatch(removeFromWatchlist(movie));
  };

  const [inWatchlist, setInWatchlist] = useState(false);

  const toggleWatchlist = () => {
    // Add logic to handle adding/removing from watchlist
    setInWatchlist(!inWatchlist);
  };

  return (
    <div>
      <button onClick={handleAdd}>Add to Watchlist</button>
      <button onClick={toggleWatchlist}>
      {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
    </button>
    </div>
 
  );
}
