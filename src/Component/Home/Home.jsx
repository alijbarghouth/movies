import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  let [trendingMovies, setTrendingMovies] = useState([]);
  let [trendingTv, setTrendingTv] = useState([]);
  let [trendingPerson, setTrendingPerson] = useState([]);

  let navigate = useNavigate();

  function goToDetails(id) {
    navigate({
      pathname: "/details",
      search: `?id=${id}`,
    });
  }
  let prefix = "https://image.tmdb.org/t/p/w500/";
  async function getTrending(mediaType, callback) {
    let {
      data: { results },
    } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=b72a13cf8a022f33aa7fde80033dde2c`
    );
    callback(results);
  }

  useEffect(() => {
    getTrending("movie", setTrendingMovies);

    getTrending("tv", setTrendingTv);

    getTrending("person", setTrendingPerson);
  }, []);

  return (
    <>
      <div className="row">
        <div
          className="col-md-12 col-lg-12 col-sm-12 text-center">
          <div className="card m-4">
            <img src={require("./Images/images.png")} height="400px" />
            <div className="card-body">
              
            </div>
          </div>
        </div>
        {trendingMovies.map((movie) => {
          return (
            <div
              className="col-md-6 col-lg-4 col-sm-12 text-center"
              key={movie.id}
              onClick={() => goToDetails(movie.id)}>
              <div className="card m-4 overflow-hidden border rounded">
                <img src={prefix + movie["poster_path"]} height="400px" className={"overflow-hidden"} />
                <div className="card-body">
                  <p className="text-muted">{movie.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="row">
      <div
          className="col-md-12 col-lg-12 col-sm-12 text-center">
          <div className="card m-4">
            <img src={require("./Images/TVShows.jpg")} height="400px" />
            <div className="card-body">
              
            </div>
          </div>
        </div>
        {trendingTv.map((movie) => {
          return (
            <div
              className="col-md-6 col-lg-4 col-sm-12 text-center"
              key={movie.id}>
              <div className="card m-4">
                <img src={prefix + movie["poster_path"]} height="400px" />
                <div className="card-body">
                  <p className="text-muted">{movie.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="row">
      <div
          className="col-md-12 col-lg-12 col-sm-12 text-center">
          <div className="card m-4">
            <img src={require("./Images/peopleTrending.png")} height="400px" />
            <div className="card-body">
              
            </div>
          </div>
        </div>
        {trendingPerson.map((person) => {
          return (
            <div
              className="col-md-6 col-lg-4 col-sm-12 text-center"
              key={person.id}>
              <div className="card m-4">
                <img src={prefix + person["profile_path"]} height="400px" />
                <div className="card-body">
                  <p className="text-muted">{person.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
