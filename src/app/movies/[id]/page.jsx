
"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { useParams } from 'next/navigation'; 

const MovieDetailsPage = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`);
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
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const videoUrl = movie.videos?.results.find(video => video.site === "YouTube" && video.type === "Trailer")?.key;

  return (
    <div>
       {videoUrl ? (
        <ReactPlayer url={`https://www.youtube.com/watch?v=${videoUrl}`} controls width="100%" height="400px" />
      ) : (
        <p>No trailer available!</p>
      )}
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>⭐ {movie.vote_average} / 10</p>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={200}
        height={350}
      />
     
    </div>
  );
};

export default MovieDetailsPage;
