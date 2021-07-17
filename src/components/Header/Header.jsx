import React from "react";
import { useHeros } from "../Context/HerosContext";

const Header = () => {
  const { setIslogin } = useHeros();

  return (
    <div className="container-fluid bg-dark py-2 d-flex justify-content-between">
      <section>
        <h2 className="text-white">Superhéroes Team</h2>
      </section>
      <section>
        <button className="btn btn-danger" onClick={() => setIslogin(null)}>
          Cerrar sesión
        </button>
      </section>
    </div>
  );
};

export default Header;
