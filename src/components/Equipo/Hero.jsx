import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Powerstats from './Powerstats'

const Hero = () => {
    const [heros, setHeros] = useState([]);
    
    useEffect(async() => {
        let participantsMalos = 0;
        let participantsBuenos = 0;
        let power = [];
        for(let i = 0; power.length !== 6; i++){
            const id = Math.floor((Math.random() * 200) + 1);
            const { data } = await axios.get(`https://superheroapi.com/api/2870408559879754/${id}`);
            power = [...power, data];
            
        }
        setHeros(power);
    }, [])

    

 const eliminarHero = (nameHero) => {
    const newName = heros.filter(n => !n.name.toLowerCase().includes(nameHero.toLowerCase()));
    setHeros(newName);
    
 }
    return (
        <Fragment>
            <div className="col-9 bg-dark d-flex rounded">
                <div className="container w-100">
                    <section className="row">
                        { 
                        
                            heros.map((hero) => {
                                
                                return(
                                        <div className="col-4 my-3">
                                            <div className="d-flex flex-column justify-content-between">
                                                <section>
                                                    <h5 className="text-center text-primary">{hero.name}</h5>
                                                    <div class="text-center" style={{width:"100%", height:"9rem"}}>
                                                        <img className="text-center" style={{maxWidth:"100%", height:"9rem", borderRadius:"100%"}} src={hero.image.url} alt="" />
                                                    </div>
                                                </section>
                                                <section>
                                                    <ul className='list-group'>
                                                        <li className='list-group-item'>Combat: {hero.powerstats.combat}</li>
                                                        <li className='list-group-item'>Durability: {hero.powerstats.durability}</li>
                                                        <li className='list-group-item'>Intelligence: {hero.powerstats.intelligence}</li>
                                                        <li className='list-group-item'>Power: {hero.powerstats.power}</li>
                                                        <li className='list-group-item'>Speed: {hero.powerstats.speed}</li>
                                                        <li className='list-group-item'>Strength: {hero.powerstats.strength}</li>
                                                    </ul>
                                                </section>
                                            </div>
                                            <div>
                                                <button className="btn btn-success w-100">Ver detalles</button>
                                                <button className="btn btn-danger w-100" onClick={() => {eliminarHero(hero.name)}}>Eliminar</button>
                                            </div>
                                        </div>
                                )
                                    
                            })
                        } 
                    </section>
                </div>
            </div>
            <div className="col-3 bg-primary">
                <Powerstats heros={heros}/>
            </div>
        </Fragment>
    )
}

export default Hero