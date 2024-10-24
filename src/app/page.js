// app/page.js
import MovieList from '@/components/MovieList';

export default async function Home({ searchParams }) {
  const query = searchParams?.query || '';
  
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&page=1`);
    const data = await res.json();

    // Ensure that `results` is an array before passing it
    const initialMovies = data.results || [];

    return (
      <div>
        <MovieList movies={initialMovies} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching movies:', error);
    return <p>Failed to load movies. Please try again later.</p>;
  }
}
