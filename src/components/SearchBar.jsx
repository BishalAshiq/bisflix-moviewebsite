// components/SearchBar.jsx
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Update import here

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter(); // Initialize the router

  const handleSearch = (event) => {
    event.preventDefault();
    // Redirect to the search results page with the query
    router.push(`/search?query=${query}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search for a movie..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
