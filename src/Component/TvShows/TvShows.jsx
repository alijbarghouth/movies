import React, { useState, useEffect } from "react";
import axios from "axios";
function TvShows() {
  let [tvShows, setTvShows] = useState([]);
  let prefix = "https://image.tmdb.org/t/p/w500/";
  let [myId, setMyId] = useState(
    localStorage.getItem("myIdTvShows")
      ? localStorage.getItem("myIdTvShows")
      : 1
  );
  async function getTvShows(id) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/1/similar?api_key=b72a13cf8a022f33aa7fde80033dde2c&language=en-US&page=${id}`
    );
    setTvShows(data.results);
  }
  function setMyIdFromLocalStorage() {
    setMyId(localStorage.getItem("myIdTvShows"));
  }
  function nexMovies() {
    setMyId(Number(myId) + 1);
    localStorage.setItem("myIdTvShows", myId);
    getTvShows(myId);
  }
  function prevMovies() {
    setMyId(myId - 1);
    localStorage.setItem("myIdTvShows", myId);
    getTvShows(myId);
  }

  useEffect(() => {
    setMyIdFromLocalStorage();
    getTvShows(myId);
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-12 text-center m-auto border border-warning border-top-0 border-end-0 border-start-0 border-5 rounded-circle">
          <p className="text-muted fs-1">TVShows</p>
        </div>
        {tvShows.map((movie, index) => {
          return (
            <div
              className="col-md-6 col-lg-4 col-sm-12 text-center"
              key={index}>
              <div className="card m-4">
                <img src={prefix + movie["poster_path"]} height="400px" alt="" />
                <div className="card-body">
                  <p className="text-muted">{movie.name}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="row d-flex ">
          <div className="col-md-12 text-center m-auto">
            {Number(myId) === 1 ? (
              ""
            ) : (
              <i
                className="fa-solid fa-arrow-left fs-1  me-5"
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

export default TvShows;
