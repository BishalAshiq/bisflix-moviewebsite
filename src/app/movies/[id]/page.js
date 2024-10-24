// app/movies/[id]/page.js
import MovieDetails from '@/components/MovieDetails';

export default async function MoviePage({ params }) {
  const { id } = params;
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY`);
  const movie = await res.json();

  return (
    <div>
      <MovieDetails movie={movie} />
    </div>
  );
}
