import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Movie from "../components/Movie";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setLoading(false);
    setMovie(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, []);

  console.log("console", movie);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div key={movie.id}>
          <h1>{movie.title}</h1>
          <img src={movie.medium_cover_image} alt={movie.title} />
          <p>{movie.description_intro}</p>
          <ul>
            {movie.genres && movie.genres.map((g) => <li key={g}>{g}</li>)}
          </ul>
          <button>
            <Link to="/">Home</Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default Detail;
