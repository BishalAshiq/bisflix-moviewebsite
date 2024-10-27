// components/Watchlist.js
import WatchlistItem from './WatchlistItem';

export default function Watchlist({ watchlist }) {
  return (
    <div className="watchlist">
      <h1>Your Watchlist</h1>
      {watchlist.length > 0 ? (
        watchlist.map((movie) => (
          <WatchlistItem key={movie.id} movie={movie} />
        ))
      ) : (
        <p>Your watchlist is empty.</p>
      )}
    </div>
  );
}
