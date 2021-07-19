import React, { useState } from "react";
import { useHeros } from "../Context/HerosContext";

const SearchHeros = () => {
  const { searchHeros, agregarHero, setIsViewSearch, addHero, setAddHero } =
    useHeros();

  const addingHero = () => {
    if (addHero) {
      return (
        <div className="col-12 mt-5 text-warning h4 text-center">
          ¡Superhéroe agregado exitosamente!
        </div>
      );
    } else {
      return (
        <div className="col-12 mt-5 text-warning h4 text-center">
          No se ha encontrado ningún superhéroe.
        </div>
      );
    }
  };
  const [addNewHero, setAddNewHero] = useState(false);
  const backgroundColor = () => {
    if (searchHeros[0]) {
      return "bg-primary";
    } else if (addNewHero) {
      return "bg-success";
    } else {
      return "bg-danger";
    }
  };
  return (
    <div className="d-flex py-2 justify-content-center items-content-center lead bg-secondary">
      <div
        className={`container p-3 rounded d-flex flex-column mt-4 overflow-auto shadow-white ${backgroundColor()}`}
        style={{ height: "100vh" }}
      >
        <section
          className={`mb-4 d-flex align-self-end ${
            searchHeros.length !== 0 && "position-fixed"
          }`}
        >
          <span
            onClick={() => {
              setIsViewSearch(false);
              setAddHero(false);
            }}
            className="bg-danger text-white shadow border border-1 rounded-circle p-2 px-3 cursor-pointer"
            style={{ cursor: "pointer" }}
          >
            X
          </span>
        </section>

        <div className="container h-100 ">
          <div className="row d-flex">
            {searchHeros.length !== 0
              ? searchHeros.map((hero, idx) => {
                  return (
                    <div
                      className="col-sm-6 col-md-4 col-lg-4 my-3 bg-dark rounded"
                      key={hero.id}
                    >
                      <div className="d-flex flex-column justify-content-between">
                        <section>
                          <h5 className="text-center text-white">
                            {hero.name}
                          </h5>
                          <div
                            class="text-center"
                            style={{ width: "100%", height: "9rem" }}
                          >
                            <img
                              className="text-center"
                              alt="image de un héroe"
                              style={{
                                maxWidth: "100%",
                                height: "9rem",
                                borderRadius: "100%",
                              }}
                              src={hero.image.url}
                            />
                          </div>
                        </section>
                        <section className="my-3">
                          <button
                            className="btn btn-primary w-100"
                            onClick={() => {
                              agregarHero(hero, idx);
                              setAddNewHero(true);
                            }}
                          >
                            Agregar al equipo
                          </button>
                        </section>
                      </div>
                    </div>
                  );
                })
              : addingHero()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeros;
