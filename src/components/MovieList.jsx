"use client";
import Image from 'next/image';
import Link from 'next/link'; // Import Link
import { useEffect, useState } from 'react';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
        console.log("API Key:", process.env.NEXT_PUBLIC_TMDB_API_KEY);

        if (!res.ok) throw new Error('Failed to fetch movies');

        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="movie-grid">
      {movies.length > 0 ? (
        movies.map(movie => (
          <div className="movie-card" key={movie.id}>
            <Link href={`/movies/${movie.id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500} // specify the width of the image
                height={750} // specify the height of the image
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
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default MovieList;
