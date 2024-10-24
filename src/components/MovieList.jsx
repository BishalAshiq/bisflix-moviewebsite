// components/MovieList.js
import MovieCard from './MovieCard';

export default function MovieList({ movies }) {
  // Add a check to ensure movies is an array before attempting to map over it
  if (!movies || movies.length === 0) {
    return <p>No movies available at the moment.</p>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
