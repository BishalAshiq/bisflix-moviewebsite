
// components/WatchlistItem.js
import Link from 'next/link';

export default function WatchlistItem({ movie }) {
  return (
    <div className="watchlist-item">
      <Link href={`/movies/${movie.id}`}>
        <a>{movie.title}</a>
      </Link>
      <p>{movie.overview}</p>
    </div>
  );
}
