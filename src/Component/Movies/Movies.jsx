import React, { useEffect,useState } from "react";
import axios from "axios";
function Movies() {
  let [movies, setMovies] = useState([]);
  let prefix = "https://image.tmdb.org/t/p/w500/";
  let [myId, setMyId] = useState(
    localStorage.getItem("myIdMovies")
      ? localStorage.getItem("myIdMovies")
      : 1
  );
  async function getMovies(id) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=b72a13cf8a022f33aa7fde80033dde2c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${id}&with_watch_monetization_types=flatrate`
    );
    setMovies(data.results);
  }
  function setMyIdFromLocalStorage() {
    setMyId(localStorage.getItem("myIdMovies"));
  }
  function nexMovies() {
    setMyId(Number(myId) + 1);
    localStorage.setItem("myIdMovies", myId);
    getMovies(myId);
  }
  function prevMovies() {
    setMyId(myId - 1);
    localStorage.setItem("myIdMovies", myId);
    getMovies(myId);
  }

  useEffect(() => {
    setMyIdFromLocalStorage();
    getMovies(myId);
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-12 text-center m-auto  border border-warning border-top-0 border-end-0 border-start-0 border-5 rounded-circle">
          <p className="text-muted fs-1">Movies</p>
        </div>
        {movies.map((movie, index) => {
          return (
            <div
              className="col-md-6 col-lg-4 col-sm-12 text-center"
              key={index}>
              <div className="card m-4">
                <img
                  src={prefix + movie["poster_path"]}
                  height="400px"
                  alt=""
                />
                <div className="card-body">
                  <p className="text-muted">{movie.title}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="row">
          <div className="col-md-12 text-center m-auto">
            {Number(myId) === 1 ? (
              ""
            ) : (
              <i
                className="fa-solid fa-arrow-left fs-1 me-5"
                onClick={prevMovies}></i>
            )}

            <i
              className="fa-solid fa-arrow-right fs-1 ms-5"
              onClick={nexMovies}></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Movies;
