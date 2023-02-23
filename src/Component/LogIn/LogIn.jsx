import React, { useState } from "react";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
function LogIn({ setLoginDataFromLocalStorage }) {
  let [user, setUser] = useState({
    emailAddress: "",
    password: "",
  });
  let [errors, setErrors] = useState([]);

  let [loading, setLoading] = useState(false);


  let navigate = useNavigate();
  function goToHome() {
    let path = "/home";
    navigate(path);
  }

  let submitData = async (e) => {
    e.preventDefault();

    let validated = validations();
    try {
      setErrors(validated.error.details);
      if (validated.error.details.length > 0) {
        return "notValid";
      }
    } catch (error) {
      setLoading(true);
      let { data } = await axios.post(
        "https://localhost:44354/api/Ahmad/LogIn",
        user
      );

      localStorage.setItem("token", data);
      setLoginDataFromLocalStorage();
      goToHome();
    }
  };
  let getFormValues = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;

    setUser(myUser);
  };

  function validations() {
    const schema = Joi.object({
      emailAddress: Joi.string()
        .required()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "org"] },
        }),
      password: Joi.string().required(),
    });
    return schema.validate(user, { abortEarly: false });
  }
  return (
    <div>
      {errors.map((error) => (
        <div
          className="alert alert-danger text-white fs-5 fw-bold"
          role="alert"
          key={error.path}>
          {error.message}
        </div>
      ))}

      <div className="container">
        <form onSubmit={submitData}>
          <div className="m-5">
            <label
              htmlFor="emailAddress "
              className="form-label text-center d-block">
              Email
            </label>
            <input
              onChange={getFormValues}
              type="email"
              placeholder="Email"
              className="form-control"
              name="emailAddress"
              id="emailAddress"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-5">
            <label
              htmlFor="password"
              className="form-label text-center d-block">
              Password
            </label>
            <input
              autoComplete="true"
              onChange={getFormValues}
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="m-5 text-center">
            <button type="submit" className="btn btn-primary mt-3">
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
