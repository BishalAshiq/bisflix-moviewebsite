"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchContainerRef = useRef(null);

  const handleSearch = (event) => {
    event.preventDefault();
    if (query) {
      router.push(`/search?query=${query}`);
      setQuery(''); // Clear input
      setSuggestions([]); // Clear suggestions
    }
  };

  const fetchSuggestions = async (searchQuery) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`);
      const data = await res.json();
      return data.results || [];
    } catch (error) {
      console.error('Failed to fetch suggestions', error);
      return [];
    }
  };

  useEffect(() => {
    if (query.length > 1) {
      setLoading(true);
      const debounceFetch = setTimeout(async () => {
        const results = await fetchSuggestions(query);
        setSuggestions(results);
        setLoading(false);
      }, 300);

      return () => clearTimeout(debounceFetch);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // Handle clicking outside the search bar to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container" ref={searchContainerRef}>
      <form onSubmit={handleSearch}>
        <input
          className='search-inp-color'
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          autoComplete="off"
        />
      </form>
      {loading ? (
        <div className="loading"></div>
      ) : suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((movie) => (
            <li
              key={movie.id}
              onClick={() => {
                setQuery(''); // Clear input
                router.push(`/movies/${movie.id}`);
                setSuggestions([]); // Clear suggestions
              }}
            >
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
