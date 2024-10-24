// components/Recommendations.js
import MovieList from './MovieList';

export default function Recommendations({ recommendations }) {
  return (
    <div className="recommendations">
      <h2>Recommendations</h2>
      <MovieList movies={recommendations} />
    </div>
  );
}
