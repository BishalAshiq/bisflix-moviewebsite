
import Image from 'next/image';
import SearchBar from '../../SearchBar';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div className='navbar-nav-div'>
        <nav className='navbar-nav'>


          <Link href="/">
            <Image
              height={10}
              width={80}
              src="/images/Netflix Logo 3d.png" 
              alt=""
              />
              
          </Link>
          <SearchBar />
          <Link href="/watchlist">
            Watchlist
          </Link>
        </nav>
      </div>
    </header>
  );
}
