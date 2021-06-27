import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import  ReactCardFlip  from  'react-card-flip';
import Powerstats from './Powerstats/Powerstats';
import DetalleHero from './DetalleHero/DetalleHero';

const Hero = () => {
    const [heros, setHeros] = useState([]);
    
    useEffect(() => {
        let participantsMalos = 0;
        let participantsBuenos = 0;
        let power = [];
        let id = 0;
        const obtenerUsuario = async() =>{
            for(let i = 0; power.length !== 6; i++){
                id = Math.floor((Math.random() * 500) + 1);
                console.log(id)
                const { data } = await axios.get(`https://superheroapi.com/api/2870408559879754/${id}`);

                if(data.powerstats.combat <= 65 && data.powerstats.power <= 65 && participantsMalos < 3){
                    participantsMalos += 1;
                    power = [...power, data];
                }else if(participantsBuenos < 3 && data.powerstats.combat >= 66 && data.powerstats.power >= 66){
                    participantsBuenos += 1;
                    power = [...power, data];
                }
                
                const eliminaPersonasDuplicadas = (arr) => {
                    const powerMap = arr.map(hero => {
                      return [hero.name, hero]
                    });
                  
                    power = [...new Map(powerMap).values()];
                  }
                  
                  eliminaPersonasDuplicadas(power);     
                
            }
            
        setHeros(power);
        }
        obtenerUsuario()
    }, []);

    const eliminarHero = (nameHero) => {
        const newName = heros.filter(n => !n.name.toLowerCase().includes(nameHero.toLowerCase()));
        setHeros(newName);
        
    }

    const [flipped, setFlipped] = useState('');
    const handleFlipped = (name) => {
        flipped === name ? setFlipped('') : setFlipped(name);
    }

    return (
        <Fragment>
            <div className="col-12 d-flex rounded">
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
                                                <section className="mt-3">
                                                    <ReactCardFlip 
                                                        isFlipped = { flipped === hero.name }
                                                    >
                                                        <div>
                                                            <ul className='list-group'>
                                                            <li className='list-group-item'>Combat: {hero.powerstats.combat}</li>
                                                            <li className='list-group-item'>Durability: {hero.powerstats.durability}</li>
                                                            <li className='list-group-item'>Intelligence: {hero.powerstats.intelligence}</li>
                                                            <li className='list-group-item'>Power: {hero.powerstats.power}</li>
                                                            <li className='list-group-item'>Speed: {hero.powerstats.speed}</li>
                                                            <li className='list-group-item'>Strength: {hero.powerstats.strength}</li>
                                                        </ul>

                                                        </div>
                                                        <DetalleHero hero={hero}/>
                                                    </ReactCardFlip>
                                                </section>
                                                
                                            </div>
                                            <div>
                                                {
                                                    flipped === hero.name ? 
                                                        <button onClick={() => handleFlipped(hero.name)} className="btn btn-secondary w-100">Ver poderes</button>
                                                    :
                                                        <button onClick={() => handleFlipped(hero.name)} className="btn btn-success w-100">Ver detalles</button>
                                                }
                                                {
                                                    heros.length !== 6 ? 
                                                        <button className="btn btn-danger w-100" onClick={() => {eliminarHero(hero.name)}} disabled>Eliminar</button>
                                                    :
                                                        <button className="btn btn-danger w-100" onClick={() => {eliminarHero(hero.name)}}>Eliminar</button>
                                                }
                                                
                                            </div>
                                        </div>
                                )
                                    
                            })
                        } 
                    </section>
                </div>
            </div>
            <section className="container">
                <div className="row">
                    <div className="col-12">
                        <Powerstats heros={heros}/>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Hero