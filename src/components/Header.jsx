// components/Header.js
import SearchBar from './SearchBar';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">
          <p>Movie App</p>
        </Link>
        <SearchBar />
        <Link href="/watchlist">
          <p>Watchlist</p>
        </Link>
      </nav>
    </header>
  );
}
