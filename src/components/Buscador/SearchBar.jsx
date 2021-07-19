import React, { useState } from "react";
import { useHeros } from "../Context/HerosContext";

const SearchBar = ({ index }) => {
  const [heroes, setHeroes] = useState();

  const { search, heros } = useHeros();

  const inputHeroe = (e) => {
    setHeroes(e.target.value);
  };

  return (
    heros && (
      <div className="container-fluid justify-content-center py-2">
        <section className="row d-flex">
          <div className="col-md-7 offset-md-2 col-sm-12">
            <label
              htmlFor="searchBar"
              className="d-flex align-content-end border-0 mb-sm-2"
              style={{ height: "2.5rem" }}
            >
              <input
                className="shadow border border-light rounded-pill p-2 w-100 "
                style={{ outline: "none" }}
                type="text"
                placeholder="Buscar superhéroes"
                onChange={inputHeroe}
              />
            </label>
          </div>

          <div className="col-md-2 col-sm-12 d-flex justify-content-center">
            <section style={{ height: "2.5rem" }}>
              {heroes ? (
                <button
                  className="btn btn-white bg-success rounded-circle h-100"
                  onClick={() => {
                    search(heroes, index);
                  }}
                >
                  Buscar
                </button>
              ) : (
                <button
                  className="btn btn-white bg-success rounded-circle h-100"
                  disabled
                >
                  Buscar
                </button>
              )}
            </section>
          </div>
        </section>
      </div>
    )
  );
};

export default SearchBar;
