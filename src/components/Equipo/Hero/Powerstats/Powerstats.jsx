import React, { useEffect } from "react";
import { useHeros } from "../../../Context/HerosContext";

const Powerstats = ({ index }) => {
  const { powerstatsLevel, heros, powerstats } = useHeros();

  useEffect(() => {
    powerstatsLevel();
  }, [heros]);

  return powerstats.length !== 0 ? (
    <div className="container mb-5 border-rounded bg-dark ">
      <h2
        className="text-center my-3 text-primary"
        style={{ display: heros.length !== 0 ? "block" : "none" }}
      >
        Nivel de poder del {index + 1}° equipo
      </h2>
      <section className="row text-center">
        <div className="col-sm-6 col-md-4 col-lg-2 list-group-item">
          <b>1. {powerstats[index][0].type}:</b> {powerstats[index][0].level}
        </div>

        <div className="col-sm-6 col-md-4 col-lg-2 list-group-item">
          <b>2. {powerstats[index][1].type}:</b> {powerstats[index][1].level}
        </div>

        <div className="col-sm-6 col-md-4 col-lg-2 list-group-item">
          <b>3. {powerstats[index][2].type}:</b> {powerstats[index][2].level}
        </div>

        <div className="col-sm-6 col-md-4 col-lg-2 list-group-item">
          <b>4. {powerstats[index][3].type}:</b> {powerstats[index][3].level}
        </div>

        <div className="col-sm-6 col-md-4 col-lg-2 list-group-item">
          <b>5. {powerstats[index][4].type}:</b> {powerstats[index][4].level}
        </div>

        <div className="col-sm-6 col-md-4 col-lg-2 list-group-item">
          <b>6. {powerstats[index][5].type}:</b> {powerstats[index][5].level}
        </div>
      </section>
    </div>
  ) : null;
};

export default Powerstats;
