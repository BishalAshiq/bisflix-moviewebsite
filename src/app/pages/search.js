"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchResults = () => {
  const router = useRouter();
  const { searchParams } = router.query; // Get the search query
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchParams) return; // Prevent fetching if searchParams is not available
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchParams}`);

        if (!res.ok) throw new Error('Failed to fetch search results');

        const data = await res.json();
        setResults(data.results || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchParams]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Search Results</h1>
      {results.length > 0 ? (
        results.map(movie => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
