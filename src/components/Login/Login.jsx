import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHeros } from "../Context/HerosContext";

const Login = () => {
  const { email, setEmail, password, setPassword, isLogin, setIslogin } =
    useHeros();

  const [msgError, setMsgError] = useState(null);

  const login = () => {
    setIslogin(false);
    setMsgError("");
    axios
      .post(`http://challenge-react.alkemy.org/`, {
        email: email,
        password: password,
      })
      .catch(function (error) {
        setMsgError("¡El email y/o password son incorrectos!");
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
    <div
      className="container lead m-auto d-flex flex-column justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="row align-self-center bg-dark rounded shadow-lg border border-primary border-bottom-0 p-4">
        <div className="col-12">
          <form className="form-group">
          <div className="text-success">correo: challenge@alkemy.org</div>
          <div className="text-success">contraseña: react</div>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                setMsgError("");
              }}
              className="form-control"
              type="text"
              placeholder="Introduce tu correo"
              aria-required="true"
              required
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
                setMsgError("");
              }}
              className="form-control mt-4"
              type="password"
              placeholder="Introduce tu contraseña"
              aria-required="true"
              required
            />
          </form>
          {isLogin === null ? (
            <button
              onClick={login}
              className="btn btn-success btn-block w-100 mt-4"
            >
              Iniciar sesión
            </button>
          ) : (
            <button
              onClick={login}
              className="btn btn-success btn-block w-100 mt-4"
              disabled
            >
              <div className="spinner-border spinner-border-sm" role="status">
                <span class="sr-only"></span>
              </div>
            </button>
          )}
        </div>
      </div>
      {msgError !== null ? (
        <p className="text-warning text-center h6">{msgError}</p>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default Login;
