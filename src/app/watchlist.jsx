// pages/watchlist.js
import Watchlist from '../components/Watchlist';

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
