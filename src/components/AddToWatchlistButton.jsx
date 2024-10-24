// components/AddToWatchlistButton.js
import { useState } from 'react';

export default function AddToWatchlistButton({ movie }) {
  const [inWatchlist, setInWatchlist] = useState(false);

  const toggleWatchlist = () => {
    // Add logic to handle adding/removing from watchlist
    setInWatchlist(!inWatchlist);
  };

  return (
    <button onClick={toggleWatchlist}>
      {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
    </button>
  );
}
