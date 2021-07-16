import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHeros } from "../Context/HerosContext";

const Login = () => {
  const { email, setEmail, password, setPassword, isLogin, setIslogin } =
    useHeros();

  const [msgError, setMsgError] = useState(null);
  console.log(isLogin);
  console.log(email);

  const login = () => {
    setIslogin(false);
    axios
      .post(`http://challenge-react.alkemy.org/`, {
        email: email,
        password: password,
      })
      .catch(function (error) {
        if (error.response) {
          setMsgError("Error");
        } else {
          setMsgError("Error");
        }
      })
      .then((res) => {
        if (res) {
          setIslogin(true);
          setMsgError("");
        } else {
          setIslogin(null);
        }
      });
  };

  return (
    <div className="container bg-dark h-75 w-25 m-auto d-flex justify-content-center rounded">
      <div className="row align-self-center">
        <div className="col">
          <form className="form-group">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control"
              type="text"
              placeholder="Introduce tu email"
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="form-control mt-4"
              type="password"
              placeholder="Introduce tu password"
            />
          </form>
          <button onClick={login} className="btn btn-success btn-block w-100 mt-4">
            Iniciar sesión
          </button>
          {msgError !== null ? <div>{msgError}</div> : <span></span>}
        </div>
      </div>
    </div>
  );
};

export default Login;
