
"use client";
import { useEffect, useState } from 'react';
import Watchlist from '../../app/watchlist/page'; 
export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(savedWatchlist);
  }, []);

  return (
    <div>
      <Watchlist watchlist={watchlist} />
    </div>
  );
}
