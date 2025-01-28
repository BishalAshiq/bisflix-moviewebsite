"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
      
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`
        );
        if (!movieRes.ok) throw new Error('Failed to fetch movie details');
        const movieData = await movieRes.json();
        setMovie(movieData);

    
        const castRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`);
        if (!castRes.ok) throw new Error('Failed to fetch cast');
        const castData = await castRes.json();
        setCast(castData.cast);

       
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
      <div className='trailor-details-div'>
        <div className='trailor-div'>
          {/* Trailer */}
          {videoUrl ? (
            <ReactPlayer url={`https://www.youtube.com/watch?v=${videoUrl}`} controls width="100%" height="400px" />
          ) : (
            <p>No trailer available!</p>
          )}
        </div>

        <div className='Movie-details-div'>

          {/* Movie Poster */}
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={200}
            height={350}
          />

       
          <div>
            {/* Movie Details */}
            <h1 className='Movie-details-tag'>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>⭐ {movie.vote_average} / 10</p>

            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
          </div>
        </div>
      </div>

      <div className='cast-items-ul-div'>
        {/* Cast Section */}
        <div>
          <h2>Cast</h2>
          <ul className='cast-items-ul'>
            {cast.slice(0, 5).map(member => (
              <li key={member.id}>
                <p>{member.name} as {member.character},</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations Section */}
        <div className="recommendations-full-div">
          <h2>Recommended Movies</h2>
          <div className="recommendations-div">
            {recommendations.slice(0, 5).map(recMovie => (
              <div key={recMovie.id} className="recommendations-map">
                 <Link href={`/movie/${recMovie.id}`}>
                  <div className='recommendations-ImageDiv'>
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${recMovie.poster_path}`}
                      alt={recMovie.title}
                      width={100}
                      height={150}
                    />
                    <p className='recommendations-Imageptext'>{recMovie.title}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
