// components/CastList.js
export default function CastList({ cast }) {
    return (
      <div className="cast-list">
        <h2>Cast</h2>
        <ul>
          {cast.map((member) => (
            <li key={member.cast_id}>{member.name} as {member.character}</li>
          ))}
        </ul>
      </div>
    );
  }
  