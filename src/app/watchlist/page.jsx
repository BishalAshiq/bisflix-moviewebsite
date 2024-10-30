"use client"
import MovieCard from '@/components/MovieCard';
import { useSelector } from 'react-redux';
// import MovieCard from './MovieCard';

const Watchlist = () => {
  const watchlist = useSelector((state) => state.movies.watchlist);

  if (watchlist.length === 0) {
    return <p>Your watchlist is empty.</p>;
  }

  return (
    <div>
      {watchlist.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Watchlist;
