import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { useHeros } from "../Context/HerosContext";
import DetalleHero from "../Equipo/Hero/DetalleHero/DetalleHero";

const SearchHeros = () => {
  const { searchHeros, agregarHero, setIsViewSearch } = useHeros();
  console.log(searchHeros);
  //Uso de la librería react-card-flip para mostrar más detalles de un héroe.
  const [flipped, setFlipped] = useState("");
  const handleFlipped = (name) => {
    //Al dar click en 'Detalles' de un héroe se envía su nombre. El cual se usa en una condición para dar vuelta la carta y mostrar los detalles.
    flipped === name ? setFlipped("") : setFlipped(name);
  };

  return (
    <div className="d-flex justify-content-center items-content-center lead">
      <div
        className="container p-3 rounded bg-secondary position-absolute d-flex flex-column mt-4 overflow-auto shadow-white"
        style={{ height: "80vh" }}
      >
        <section className="mb-4 d-flex align-self-end position-fixed">
          <span
            onClick={() => {
              setIsViewSearch(false);
            }}
            className="bg-danger text-white shadow border border-1 rounded-circle p-2 px-3 cursor-pointer"
            style={{ cursor: "pointer" }}
          >
            X
          </span>
        </section>

        <div className="container h-100 ">
          <div className="row d-flex">
            {searchHeros.length !== 0 ? (
              searchHeros.map((hero) => {
                return (
                  <div
                    className="col-sm-6 col-md-4 col-lg-4 my-3 bg-dark rounded"
                    key={hero.id}
                  >
                    <div className="d-flex flex-column justify-content-between">
                      <section>
                        <h5 className="text-center text-white">{hero.name}</h5>
                        <div
                          class="text-center"
                          style={{ width: "100%", height: "9rem" }}
                        >
                          <img
                            className="text-center"
                            alt="image de héroe"
                            style={{
                              maxWidth: "100%",
                              height: "9rem",
                              borderRadius: "100%",
                            }}
                            src={hero.image.url}
                            alt=""
                          />
                        </div>
                      </section>
                      <section className="my-3">
                        <button
                          className="btn btn-primary w-100"
                          onClick={() => {agregarHero(searchHeros[0])}}
                        >
                          Agregar al equipo
                        </button>
                      
                      </section>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12 mt-5 text-warning h4 text-center">
                No se ha encontrado ningún superhéroe.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeros;
