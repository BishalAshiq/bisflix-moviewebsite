// components/MovieCard.js
import Link from 'next/link';

export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <Link href={`/movies/${movie.id}`}>
        <a>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          <h3>{movie.title}</h3>
        </a>
      </Link>
    </div>
  );
}
