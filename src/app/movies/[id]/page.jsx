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
  const [cast, setCast] = useState([]); // To store cast members
  const [recommendations, setRecommendations] = useState([]); // To store recommendations

  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details including trailer
        const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`);
        if (!movieRes.ok) throw new Error('Failed to fetch movie details');
        const movieData = await movieRes.json();
        setMovie(movieData);

        // Fetch cast
        const castRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`);
        if (!castRes.ok) throw new Error('Failed to fetch cast');
        const castData = await castRes.json();
        setCast(castData.cast);

        // Fetch recommendations
        const recRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}`);
        if (!recRes.ok) throw new Error('Failed to fetch recommendations');
        const recData = await recRes.json();
        setRecommendations(recData.results);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, apiKey]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const videoUrl = movie.videos?.results.find(video => video.site === "YouTube" && video.type === "Trailer")?.key;

  return (
    <div>
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

      <div>
        {/* Cast Section */}
        <h2>Cast</h2>
        <ul>
          {cast.slice(0, 5).map(member => ( // Displaying top 5 cast members
            <li key={member.id}>
              <p>{member.name} as {member.character}</p>
            </li>
          ))}
        </ul>
      </div>


      <div>
        {/* Recommendations Section */}
        <h2>Recommended Movies</h2>
        <div className="recommendations">
          {recommendations.slice(0, 5).map(recMovie => ( // Displaying top 5 recommendations
            <div key={recMovie.id}>
              <Image
                src={`https://image.tmdb.org/t/p/w200${recMovie.poster_path}`}
                alt={recMovie.title}
                width={100}
                height={150}
              />
              <p>{recMovie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
