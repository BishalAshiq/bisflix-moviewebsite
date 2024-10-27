// pages/movies/[id].jsx
"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const MovieDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return; // Ensure id is available

      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        if (!res.ok) throw new Error('Failed to fetch movie details');

        const data = await res.json();
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]); // Dependency array includes id

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  if (!movie) return null; // Handle case where movie is not found

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>⭐ {movie.vote_average} / 10</p>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
    </div>
  );
};

export default MovieDetails;
