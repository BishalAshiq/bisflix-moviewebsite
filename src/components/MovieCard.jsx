// components/MovieCard.jsx
import Image from 'next/image';
import Link from 'next/link';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link href={`/movies/${movie.id}`}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
          className="movie-image"
        />
        <div className="movie-info">
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-description">{movie.overview.slice(0, 100)}...</p>
          <div className="movie-rating">
            <span>⭐ {movie.vote_average} / 10</span>
          </div>
        </div>
      </Link>
      
    </div>
  );
};

export default MovieCard;
