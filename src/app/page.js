"use client";
import MovieList from '../components/MovieList';

const Home = () => {
    return (
        <div>
            <div className='Popular-mov-texts-div'>
                <h1 className='Popular-mov-texts'>Popular Movies</h1>
                <MovieList />
            </div>
        </div>
    );
};

export default Home;
