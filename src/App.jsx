import "./App.css";
import { getMovieList, searchMovie } from "./api";
import { useEffect, useState } from "react";

const App = () => {
  const [popularMovies, setPopularMovies] = useState();
  const [isNotif, setIsNotif] = useState(false);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const notif = () => {
    setIsNotif(!isNotif);
    setTimeout(() => {
      setIsNotif((state) => !state);
    }, 2000);
  };

  console.log({ isNotif });

  const PopularMovieList = () => {
    return popularMovies?.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img
            className="Movie-img"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
          />
          <div className="Movie-date">Release : {movie.release_date}</div>
          <div className="Movie-rate">Rating : {movie.vote_average}</div>
        </div>
      );
    });
  };

  const searchItem = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  return (
    <div className="App">
      {isNotif && <h3>TERIMAKASIH GUYSSS!!! Sudah Melihat website ini ....</h3>}
      <button onClick={notif} className="btn">
        {isNotif ? "notifikasi OFF" : "notifikasi ON"}
      </button>
      <header className="App-header">
        <h1>Search Movie App Official</h1>
        <input
          placeholder="cari movie kesukaan . . ."
          className="Movie-search"
          onChange={({ target }) => searchItem(target.value)}
        />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;
