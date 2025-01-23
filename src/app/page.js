
"use client";
import { Provider } from 'react-redux';
import store from '../redux/store';
import MovieList from '../components/MovieList';

const Home = () => {
  return (
    <Provider store={store}>
      <div>
        <div className='Popular-mov-texts-div'>
          <h1 className='Popular-mov-texts'>New this week</h1>
          <MovieList />
        </div>
      </div>
    </Provider>
  );
};

export default Home;
