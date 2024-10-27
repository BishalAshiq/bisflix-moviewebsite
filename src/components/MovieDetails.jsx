
export default function MovieDetails({ movie }) {
    return (
      <div className="movie-details">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <ul>
          {movie.genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
        <p>Release Date: {movie.release_date}</p>
      </div>
    );
  }
  