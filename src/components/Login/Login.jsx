import React, { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("challenge@alkemy.org");
  const [password, setPassword] = useState("reac");
  const [isLogin, setIslogin] = useState(false);
  const [msgError, setMsgError] = useState(null);
  console.log(isLogin);

  const login = () => {
    try {
      axios
        .post(`http://challenge-react.alkemy.org/`, {
          email: email,
          password: password,
        })
        .then((res) => {
          res ? setIslogin(true) : console.log("Error");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row mt-5">
      <div className="col"></div>
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
        <button onClick={login} className="btn btn-success btn-block">
          Iniciar sesión
        </button>
        {msgError !== null ? <div>{msgError}</div> : <span></span>}
      </div>
      <div className="col"></div>
    </div>
  );
};

export default Login;
