// "use client";
// import { createContext, useContext, useState, useEffect } from 'react';

// const WatchlistContext = createContext();

// export const WatchlistProvider = ({ children }) => {
//   const [watchlist, setWatchlist] = useState([]);

//   useEffect(() => {
//     const savedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
//     setWatchlist(savedWatchlist);
//   }, []);

//   const addToWatchlist = (movie) => {
//     const updatedWatchlist = [...watchlist, movie];
//     setWatchlist(updatedWatchlist);
//     localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
//   };

//   const removeFromWatchlist = (movieId) => {
//     const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
//     setWatchlist(updatedWatchlist);
//     localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
//   };

//   return (
//     <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
//       {children}
//     </WatchlistContext.Provider>
//   );
// };

// export const useWatchlist = () => useContext(WatchlistContext);
