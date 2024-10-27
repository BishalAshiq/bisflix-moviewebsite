"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();
    router.push(`/search?query=${query}`);
  };

  // Function to fetch movie suggestions
  const fetchSuggestions = async (searchQuery) => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Use your API key
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`);
    const data = await res.json();
    return data.results || [];
  };

  useEffect(() => {
    if (query.length > 1) { // Trigger suggestions if query has more than 1 character
      setLoading(true);
      const debounceFetch = setTimeout(async () => {
        const results = await fetchSuggestions(query);
        setSuggestions(results);
        setLoading(false);
      }, 300); // Debounce delay

      return () => clearTimeout(debounceFetch); // Cleanup
    } else {
      setSuggestions([]); // Clear suggestions when input is empty or short
    }
  }, [query]);

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          className='search-inp-color'
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          autoComplete="off"
        />
        {/* <button type="submit">Search</button> */}
      </form>
      {loading ? (
        <div>
        

        </div>
      ) : suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((movie) => (
            <li key={movie.id} onClick={() => {
              setQuery(movie.title); // Set input value to the selected movie title
              router.push(`/search?query=${movie.title}`); // Redirect to search results
              setSuggestions([]); // Clear suggestions
            }}>
              {movie.title}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}
