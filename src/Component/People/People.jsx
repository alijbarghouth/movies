import React, { useState, useEffect } from "react";
import axios from "axios";
function People() {
  let [allMovies, setAllMovies] = useState([]);
  let [myId, setMyId] = useState(
    localStorage.getItem("myId") ? localStorage.getItem("myId") : 1
  );
  let prefix = "https://image.tmdb.org/t/p/w500/";

  async function fetchMovies(id) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/images?api_key=b72a13cf8a022f33aa7fde80033dde2c`
    );
    setAllMovies(data.profiles);
  }
  function setMyIdFromLocalStorage() {
    setMyId(localStorage.getItem("myId"));
  }
  function nexMovies() {
    setMyId(Number(myId) + 1);
    localStorage.setItem("myId", myId);
    fetchMovies(myId);
  }
  function prevMovies() {
    setMyId(myId - 1);
    localStorage.setItem("myId", myId);
    fetchMovies(myId);
  }
  useEffect(() => {
    setMyIdFromLocalStorage();
    fetchMovies(myId);
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-12 text-center m-auto border border-warning border-top-0 border-end-0 border-start-0 border-5 rounded-circle">
          <p className="text-muted fs-1">People</p>
        </div>
        {allMovies.map((movie, index) => {
          return (
            <div
              className="col-md-6 col-lg-4 col-sm-12 text-center"
              key={index}>
              <div className="card m-4">
                <img src={prefix + movie["file_path"]} height="400px" />
                <div className="card-body">
                  <p className="text-muted">{movie.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="row">
        <div className="col-md-12 text-center m-auto">
          {Number(myId) === 1 ? (
            ""
          ) : (
            <i
              className="fa-solid fa-arrow-left  fs-1 me-5"
              onClick={prevMovies}></i>
          )}

          <i
            className="fa-solid fa-arrow-right fs-1 ms-5"
            onClick={nexMovies}></i>
        </div>
      </div>
    </>
  );
}

export default People;
