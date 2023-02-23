import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
function Details() {
  let [searchParams, setSearchParams] = useSearchParams();
  let [myMovies, setMyMovies] = useState({});
  let prefix = "https://image.tmdb.org/t/p/w500/";

  let myId = searchParams.get("id");
  async function getDataById() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${myId}?api_key=b72a13cf8a022f33aa7fde80033dde2c`
    );
    setMyMovies(data);
  }

  useEffect(() => {
    getDataById();
  }, []);
  return (
    <>
      <div className="row  text-center">
        {
          <div
            className="col-md-6 col-lg-4 col-sm-12 mb-5 mt-5 text-center"
            key={myMovies.id}>
            <div className="card ">
              <img src={prefix + myMovies["poster_path"]} height="400px" />
              <div className="card-body">
                <p className="text-muted">{myMovies.title}</p>
              </div>
            </div>
          </div>
        }
        <div className="col-md-6 text-center mt-auto mb-auto fw-bold ms-5 me-5">
          <p className="lh-lg">Abstract : {myMovies.overview}</p>
        </div>
      </div>
      <table class="table  table-striped table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">popularity</th>
            
            <th scope="col">release_date</th>
            <th scope="col">vote_average</th>
            <th scope="col">vote_count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="col">#</td>
            <td scope="col">{myMovies.popularity}</td>
            
            <td scope="col">{myMovies.release_date}</td>
            <td scope="col">{myMovies.vote_average} / 10</td>
            <td scope="col">{myMovies.vote_count}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Details;
