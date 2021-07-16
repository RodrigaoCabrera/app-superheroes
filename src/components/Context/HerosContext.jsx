import React, { useState, useReducer } from "react";
import axios from "axios";
import HerosReducer from "./HerosReducer";

const HerosContext = React.createContext();

export function HerosProvider(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIslogin] = useState(null);

  const initialState = {
    heros: [],
    powerstats: [],
    searchHeros: [],
  };
  const [state, dispatch] = useReducer(HerosReducer, initialState);

  const getAllHeros = async () => {
    try {
      let numerosHeroes = 1;
      let heros = [];
      while (numerosHeroes !== 13) {
        const response = await fetch(
          `https://superheroapi.com/api/2870408559879754/${numerosHeroes}`
        ); //Llamada a la API.
        const data = response.json();
        heros = [...heros, data];
        numerosHeroes++;
      }
      const results = await Promise.all(heros);
      let equipo = [];
      while (results.length !== 0) {
        equipo = [...equipo, results.splice(0, 6)];
      }
      /*
      //Eliminar heroes repetidos en el array power.
      const eliminaHeroesDuplicados = (results) => {
        const powerMap = results.map((hero) => {
          return [hero.name, hero];
        });
        results = [...new Map(powerMap).values()];
      };

      eliminaHeroesDuplicados(results);
    */
      //Enviar result al reducer para guardar héroes elegidos en un estado.
      dispatch({
        type: "GET_HEROS",
        payload: equipo,
      });
    } catch (error) {
      console.log(error);
    }
  };
  /*

  const obtenerHeroes = async () => {
    //Función para traer superhéroes
    try {
      let participantsMalos = 0;
      let participantsBuenos = 0;
      let power = []; //Array donde se guardarán temporalmente los héroes.
      let id = 0;
      for (let i = 0; power.length !== 6; i++) {
        id = Math.floor(Math.random() * 500 + 1); //Id que  se obtendrá de manera aleatoria para traer a cada héroe.

        const { data } = await axios.get(
          `https://superheroapi.com/api/2870408559879754/${id}`
        ); //Llamada a la API.

        power = [...power, data];
        //Eliminar heroes repetidos en el array power.
        const eliminaHeroesDuplicados = (power) => {
          const powerMap = power.map((hero) => {
            return [hero.name, hero];
          });

          power = [...new Map(powerMap).values()];
        };

        eliminaHeroesDuplicados(power);
      }
      //Guardar héroes elegidos en un estado.
      dispatch({
        type: "GET_HEROS",
        payload: power,
      });
    } catch (error) {
      console.log(error);
    }
  };
*/

  //Eliminar un héroe de los listados en pantalla.
  const eliminarHero = (nameHero) => {
    let heros = [];
    for (let i = 0; i < state.heros.length; i++) {
      heros = [
        ...heros,
        state.heros[i].filter(
          (n) => !n.name.toLowerCase().includes(nameHero.toLowerCase())
        ),
      ];
    }

    dispatch({
      type: "GET_HEROS",
      payload: heros,
    });
  };

  const [isViewSearch, setIsViewSearch] = useState(false);

  const search = (heroes, index) => {
    let resultSearch = [];
    for (let i = 0; i < state.heros.length; i++) {
      resultSearch = [...resultSearch, ...state.heros[i]];
    }
    const results = resultSearch.filter((hero) =>
      hero.name.toLowerCase().includes(heroes.toLowerCase())
    );
    console.log(results)
    if(results.length !== 0) { 
      results[0].equipo = index 
    }

    setIsViewSearch(true);

    dispatch({
      type: "GET_HERO",
      payload: results,
    });
  };

  const [addHero, setAddHero] = useState(false);
  const agregarHero = (hero) => {
    let newHero = state.heros;
    newHero[hero.equipo].push(hero);

    dispatch({
      type: "GET_HERO",
      payload: [],
    });
    dispatch({
      type: "GET_HEROS",
      payload: newHero,
    });
    setAddHero(true);
  };

  const powerstatsLevel = () => {
    let powerTotal = [];
    let differentsPower = [];
    let classificationPower = [];

    let key = [
      "intelligence",
      "strength",
      "speed",
      "durability",
      "power",
      "combat",
    ];

    for (let j = 0; j < state.heros?.length; j++) {
      for (let i = 0; i < key.length; i++) {
        for (let d = 0; d < state.heros[j].length; d++) {
          let clave = key[i];
          powerTotal = [
            ...powerTotal,
            state.heros[j][d].powerstats[clave] === "null"
              ? "0"
              : state.heros[j][d].powerstats[clave],
          ];
        }
        differentsPower = [...differentsPower, powerTotal.splice(0, 6)];
      }
      classificationPower = [
        ...classificationPower,
        differentsPower.splice(0, 6),
      ];
    }

    for (let j = 0; j < classificationPower.length; j++) {
      for (let i = 0; i < classificationPower[j].length; i++) {
        classificationPower[j][i] = classificationPower[j][i].reduce(
          (a, v) => Number(a) + Number(v)
        );
      }
    }
    let powerLevel = [];
    for (let j = 0; j < classificationPower.length; j++) {
      powerLevel = [
        ...powerLevel,
        [
          { type: "intelligence", level: classificationPower[j][0] },
          { type: "strength", level: classificationPower[j][1] },
          { type: "speed", level: classificationPower[j][2] },
          { type: "durability", level: classificationPower[j][3] },
          { type: "power", level: classificationPower[j][4] },
          { type: "combat", level: classificationPower[j][5] },
        ],
      ];
    }

    let classificatioByPower = [];
    for (let i = 0; i < powerLevel.length; i++) {
      classificatioByPower = [
        ...classificatioByPower,
        powerLevel[i].sort(function (a, b) {
          return a.level > b.level ? -1 : null;
        }),
      ];
    }

    //console.log(allPowerstats)
    dispatch({
      type: "GET_POWERSTATS",
      payload: classificatioByPower,
    });
  };

  return (
    <HerosContext.Provider
      value={{
        heros: state.heros,
        powerstats: state.powerstats,
        searchHeros: state.searchHeros,
        getAllHeros,
        eliminarHero,
        search,
        powerstatsLevel,
        isViewSearch,
        setIsViewSearch,
        agregarHero,
        addHero,
        setAddHero,
        email,
        setEmail,
        password,
        setPassword,
        isLogin,
        setIslogin
      }}
      {...props}
    />
  );
}

export function useHeros() {
  const context = React.useContext(HerosContext);
  if (!context) {
    console.log("Erroooor");
  }
  return context;
}
