import React, { useState, useEffect, useMemo, useReducer } from 'react';
import axios from 'axios';
import HerosReducer from './HerosReducer';

const HerosContext = React.createContext();

export function HerosProvider(props) {

    const initialState = {
        heros: [],
        powerstats: []
    };
    const [state, dispatch] = useReducer(HerosReducer, initialState)



    const obtenerHeroes = async () => {//Función para traer superhéroes
        try {
            let participantsMalos = 0;
            let participantsBuenos = 0;
            let power = [];//Array donde se guardarán temporalmente los héroes.
            let id = 0;
            for (let i = 0; power.length !== 6; i++) {
                id = Math.floor((Math.random() * 500) + 1); //Id que  se obtendrá de manera aleatoria para traer a cada héroe.

                const { data } = await axios.get(`https://superheroapi.com/api/2870408559879754/${id}`);//Llamada a la API.


                power = [...power, data];
                //Eliminar heroes repetidos en el array power.
                const eliminaHeroesDuplicados = (power) => {
                    const powerMap = power.map(hero => {
                        return [hero.name, hero]
                    });

                    power = [...new Map(powerMap).values()];
                }

                eliminaHeroesDuplicados(power);
            }
            //Guardar héroes elegidos en un estado.
            dispatch({
                type: 'GET_HEROS',
                payload: power
            })

        } catch (error) {
            console.log(error)
        }

    };


    //Eliminar un héroe de los listados en pantalla.
    const eliminarHero = (nameHero) => {
        const newName = state.heros.filter(n => !n.name.toLowerCase().includes(nameHero.toLowerCase()));
        dispatch({
            type: 'GET_HEROS',
            payload: newName
        })
    };




    const powerstatsLevel = () => {
        let allPowerstats = [{
            'combat': [],
            'durability': [],
            'intelligence': [],
            'power': [],
            'speed': [],
            'strength': []

        }];
        try {
            state.heros?.map(hero => {
                return (
                    //Uso de reduce para sumar los puntos delos diferentes poderes de los héroes que conforman el equipo.Y luego split() para formar un array del número obtenido para guardarlo en la constante 'alPowerstats' de más arriba.
                    allPowerstats = [{
                        'combat': String([...allPowerstats[0].combat, (hero.powerstats.combat === 'null' ? '0' : hero.powerstats.combat)].reduce((a, v) => Number(a) + Number(v))).split(),

                        'durability': String([...allPowerstats[0].durability, hero.powerstats.durability !== 'null' ? hero.powerstats.durability : '0'].reduce((a, v) => Number(a) + Number(v))).split(),

                        'intelligence': String([...allPowerstats[0].intelligence, hero.powerstats.intelligence !== 'null' ? hero.powerstats.intelligence : '0'].reduce((a, v) => Number(a) + Number(v))).split(),

                        'speed': String([...allPowerstats[0].speed, hero.powerstats.speed !== 'null' ? hero.powerstats.speed : '0'].reduce((a, v) => Number(a) + Number(v))).split(),

                        'power': String([...allPowerstats[0].power, hero.powerstats.power !== 'null' ? hero.powerstats.power : '0'].reduce((a, v) => Number(a) + Number(v))).split(),

                        'strength': String([...allPowerstats[0].strength, hero.powerstats.strength !== 'null' ? hero.powerstats.strength : '0'].reduce((a, v) => Number(a) + Number(v))).split(),
                    }]
                )
            })
            dispatch({
                type: 'GET_POWERSTATS',
                payload: allPowerstats
            })
        } catch (error) {
            console.log(error)
        }

    }



    /*const value = useMemo(() => {
        return ({
            heros,
            eliminarHero,
            powerstats
        })
    }, [heros, powerstats])*/

    return <HerosContext.Provider
        value={{
            heros: state.heros,
            powerstats: state.powerstats,
            obtenerHeroes,
            eliminarHero,
            powerstatsLevel

        }} {...props}
    />
}

export function useHeros() {
    const context = React.useContext(HerosContext);
    if (!context) {
        console.log('Erroooor')
    }
    return context;
}