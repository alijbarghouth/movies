import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar.jsx";
import Home from "./Component/Home/Home.jsx";
import About from "./Component/About/About.jsx";
import Movies from "./Component/Movies/Movies.jsx";
import TvShows from "./Component/TvShows/TvShows.jsx";
import People from "./Component/People/People.jsx";
import LogIn from "./Component/LogIn/LogIn.jsx";
import Register from "./Component/Register/Register.jsx";
import jwtDecode from "jwt-decode";
import PrrotectedRoutes from "./Component/PrrotectedRoutes/PrrotectedRoutes.jsx";
import Details from "./Component/Details/Details.jsx";
import NotFound from "./Component/NotFound/NotFound.jsx";
import Profile from "./Component/Profile/Profile.jsx";
import Swal from "sweetalert2";
const App = () => {
  let [loginData, setLoginData] = useState(
    localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token"))
      : null
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoginDataFromLocalStorage();
    }
  }, []);
  // let navigateing = useNavigate();
  function setLoginDataFromLocalStorage() {
    let token = localStorage.getItem("token");
    let decode = jwtDecode(token);
    setLoginData(decode);
  }

  function logOut() {
    localStorage.removeItem("token");
    setLoginData(null);
    <Navigate to={"login"} />;
  }
  return (
    <div className="App">
      <Navbar loginData={loginData} logOut={logOut} />
      <div className="container">
        <Routes>
          <Route element={<PrrotectedRoutes loginData={loginData} />}>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="details" element={<Details />} />
            <Route path="movies" element={<Movies />} />
            <Route path="tvshows" element={<TvShows />} />
            <Route path="people" element={<People />} />
            <Route path="about" element={<About />} />
            <Route
              path="profile"
              element={<Profile loginProfile={loginData} />}
            />
          </Route>
          <Route
            path="login"
            element={
              <LogIn
                setLoginDataFromLocalStorage={setLoginDataFromLocalStorage}
              />
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
