// components/Header.js
import SearchBar from './SearchBar';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">
          <a>Movie App</a>
        </Link>
        <SearchBar />
        <Link href="/watchlist">
          <a>Watchlist</a>
        </Link>
      </nav>
    </header>
  );
}
