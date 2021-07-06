import React from 'react';
import { useHeros } from '../../../Context/HerosContext';

const PowerLevel = () => {
    const { powerstats } = useHeros();

    const handleClassification = () => {
        
        let differentPowers = [];//tendrá los diferentes poderes del equipo.
        let greaterPower;//Guardará el poder de mayor nivel.
        let classificatioByPower = [];//ARray que guardará los poderes del equipo de mayor a menor.
        
        powerstats.map((power) => {
            //Agregado de cada uno de los poderes totales del equipo.
            differentPowers = [...power.combat, ...power.speed, ...power.intelligence, ...power.power, ...power.strength, ...power.durability];
            //Elección del poder de mayor nivel.
            greaterPower = Math.max(...differentPowers);
            return(
                differentPowers.map((index) => {
                    //Clasificación de los niveles de poder del equipo de mayor a menor.
                    switch (String(greaterPower)) {//Si el poder de mayor nivel coincide con algun 'case' se ubicará primero en el array 'diffferentPowers'.
                        case powerstats[0].combat[0]:
                            differentPowers = differentPowers.filter(f => f !== String(greaterPower));//Filtrado de los poderes para extraer el de mayor nivel.
                            greaterPower = Math.max(...differentPowers);//Elección de un nuevo máximo poder.
                            classificatioByPower = [...classificatioByPower, {'Combat':powerstats[0].combat[0]}]; //Agregado del poder elegido a al array 'classificatioByPower'.
                            break;
                        case powerstats[0].speed[0]:
                            differentPowers = differentPowers.filter(f => f !== String(greaterPower));
                            greaterPower = Math.max(...differentPowers);
                            classificatioByPower = [...classificatioByPower, {'Speed':powerstats[0].speed[0]}]
                            break;
                        case powerstats[0].intelligence[0]:
                            differentPowers = differentPowers.filter(f => f !== String(greaterPower));
                            greaterPower = Math.max(...differentPowers);
                            classificatioByPower = [...classificatioByPower, {'Intelligence':powerstats[0].intelligence[0]}];
                            break;
                        case powerstats[0].power[0]:
                            differentPowers = differentPowers.filter(f => f !== String(greaterPower));
                            greaterPower = Math.max(...differentPowers);
                            classificatioByPower = [...classificatioByPower, {'Power':powerstats[0].power[0]}];
                            break;
                        case powerstats[0].strength[0]:
                            differentPowers = differentPowers.filter(f => f !== String(greaterPower));
                            greaterPower = Math.max(...differentPowers);
                            classificatioByPower = [...classificatioByPower, {'Strength':powerstats[0].strength[0]}];
                            break;
                        case powerstats[0].durability[0]:
                            differentPowers = differentPowers.filter(f => f !== String(greaterPower));
                            greaterPower = Math.max(...differentPowers);
                            classificatioByPower = [...classificatioByPower, {'Durability':powerstats[0].durability[0]}];
                            break;
                    
                        default:
                            break;
                    }
                    return classificatioByPower;
                })
            )
        });
        //Listado de los niveles de poder del equipo. 
        if(classificatioByPower.length !== 0){
            return (
                <section className="row">
                        <div className='col-sm-6 col-md-4 col-lg-2 list-group-item'>
                            <b>1. {Object.getOwnPropertyNames(classificatioByPower[0])[0]}:</b> {Object.values(classificatioByPower[0])[0]}
                        </div>

                        <div className='col-sm-6 col-md-4 col-lg-2 list-group-item'>
                            <b>2. {Object.getOwnPropertyNames(classificatioByPower[1])[0]}:</b> {Object.values(classificatioByPower[1])[0]}
                        </div>

                        <div className='col-sm-6 col-md-4 col-lg-2 list-group-item'>
                            <b>3. {Object.getOwnPropertyNames(classificatioByPower[2])[0]}:</b> {Object.values(classificatioByPower[2])[0]}
                        </div>

                        <div className='col-sm-6 col-md-4 col-lg-2 list-group-item'>
                            <b>4. {Object.getOwnPropertyNames(classificatioByPower[3])[0]}:</b> {Object.values(classificatioByPower[3])[0]}
                        </div>

                        <div className='col-sm-6 col-md-4 col-lg-2 list-group-item'>
                            <b>5. {Object.getOwnPropertyNames(classificatioByPower[4])[0]}:</b> {Object.values(classificatioByPower[4])[0]}
                        </div>

                        <div className='col-sm-6 col-md-4 col-lg-2 list-group-item'>
                            <b>6. {Object.getOwnPropertyNames(classificatioByPower[5])[0]}:</b> {Object.values(classificatioByPower[5])[0]}
                        </div>
                    </section>
            )
        }
    }
    return (
        <div>
            {powerstats.length !== 0 ? handleClassification() : null}
        </div>
    )
}

export default PowerLevel
