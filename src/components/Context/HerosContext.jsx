import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import HerosReducer from "./HerosReducer";

const HerosContext = React.createContext();

export function HerosProvider(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIslogin] = useState(null);

  const initialState = {
    allHeros: [],
    heros: [],
    powerstats: [],
    searchHeros: [],
  };
  const [state, dispatch] = useReducer(HerosReducer, initialState);

  const localStorageKey = "super_heroes";
  const loadHerosInLocalStorage = () => {
    const heroes =
      JSON.parse(window.localStorage.getItem(localStorageKey)) || [];

    dispatch({
      type: "GET_ALL_HEROS",
      payload: heroes,
    });
  };
  useEffect(() => {
    loadHerosInLocalStorage();
  }, []);

  const getHeros = () => {
    try {
      let numerosHeroes = 0;
      let heros = [];
      while (numerosHeroes !== 12) {
        heros = [...heros, state.allHeros[numerosHeroes]];
        numerosHeroes++;
      }
      let results = [];
      while (heros.length !== 0) {
        results = [...results, heros.splice(0, 6)];
      }
      //Enviar result al reducer para guardar héroes elegidos en un estado.
      dispatch({
        type: "GET_HEROS",
        payload: results,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllHeros = async () => {
    try {
      let numerosHeroes = 1;
      let heros = [];
      while (numerosHeroes !== 732) {
        const response = await fetch(
          `https://superheroapi.com/api/2870408559879754/${numerosHeroes}`
        ); //Llamada a la API.
        const data = response.json();
        heros = [...heros, data];
        numerosHeroes++;
      }
      const results = await Promise.all(heros);

      window.localStorage.setItem(localStorageKey, JSON.stringify(results));
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
        type: "GET_ALL_HEROS",
        payload: results,
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
  const eliminarHero = (nameHero, index) => {
    let heros = state.heros;
    let deleteHero = heros[index].filter(
      (hero) => !hero.name.toLowerCase().includes(nameHero.toLowerCase())
    );
    heros[index] = deleteHero;

    dispatch({
      type: "GET_HEROS",
      payload: heros,
    });
  };

  const [isViewSearch, setIsViewSearch] = useState(false);

  const search = (heroes, index) => {
    const results = state.allHeros.filter((hero) =>
      hero.name.toLowerCase().includes(heroes.toLowerCase())
    );

    if (results.length !== 0) {
      for (let i = 0; i < results.length; i++) {
        results[i].equipo = index;
      }
    }

    setIsViewSearch(true);

    dispatch({
      type: "GET_HERO",
      payload: results,
    });
  };

  const [addHero, setAddHero] = useState(false);
  const agregarHero = (hero, idx) => {
    let newHero = state.heros;
    newHero[state.searchHeros[idx].equipo].push(hero);

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
        allHeros: state.allHeros,
        heros: state.heros,
        powerstats: state.powerstats,
        searchHeros: state.searchHeros,
        getAllHeros,
        getHeros,
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
        setIslogin,
        loadHerosInLocalStorage,
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
