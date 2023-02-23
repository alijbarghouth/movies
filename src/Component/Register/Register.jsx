import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
  let [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    role: "Admin",
  });
  let [errorlist, setErrorList] = useState([]);

  let [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  function goToLogin() {
    let path = "/login";
    navigate(path);
  }
  let submitData = async (e) => {
    e.preventDefault();
    let validated = validateing();
    try {
      setErrorList(validated.error.details);
      if (validated.error.details.length > 0) {
        return "notValid";
      }
    } catch (error) {
      setLoading(true);
      let data = await axios.post(
        "https://localhost:44354/api/Ahmad/UserRegister",
        user
      );
      if (data.status === 200) {
        goToLogin();
      } else {
        setLoading(false);
      }
      console.log(data);
    }
  };

  let getFormValues = (e) => {
    let myUser = { ...user }; //كل واحد بمكان بالذاكرة
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };

  function validateing() {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .required()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "org"] },
        }),
      password: Joi.string().min(10).required(),
      role: Joi.string().required(),
    });
    return schema.validate(user, { abortEarly: false });
  }
  return (
    <div>
      {errorlist.map((error) => (
        <div class="alert alert-danger text-white fs-5 fw-bold" role="alert">
          {error.message}
        </div>
      ))}
      <div className="container">
        <form onSubmit={submitData}>
          <div className="m-5 form-group">
            <label htmlFor="name" className="text-center d-block form-label">
              Name
            </label>
            <input
              onChange={getFormValues}
              placeholder="Name"
              type="text"
              className="form-control"
              name="name"
              id="name"
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
          <div className="m-5">
            <label htmlFor="email " className="form-label text-center d-block">
              Email
            </label>
            <input
              onChange={getFormValues}
              type="email"
              placeholder="Email"
              className="form-control"
              name="email"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="m-5 text-center">
            <button type="submit" className="btn btn-primary mt-3">
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
