import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import  ReactCardFlip  from  'react-card-flip';
import Powerstats from './Powerstats/Powerstats';
import DetalleHero from './DetalleHero/DetalleHero';
import Loading from '../../Loading/Loading';

const Hero = () => {
    const [heros, setHeros] = useState([]);
    
    useEffect(() => {
        const obtenerHeroes = async() =>{//Función para traer superhéroes
            try {
                let participantsMalos = 0;
                let participantsBuenos = 0;
                let power = [];//Array donde se guardarán temporalmente los héroes.
                let id = 0;
                for(let i = 0; power.length !== 6; i++){
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
                setHeros(power);

            } catch (error) {
                console.log(error)
            }
            
        }
        obtenerHeroes()
    }, []);

    //Eliminar un héroe de los listados en pantalla.
    const eliminarHero = (nameHero) => {
        const newName = heros.filter(n => !n.name.toLowerCase().includes(nameHero.toLowerCase()));
        setHeros(newName);
        
    }
    //Uso de la librería react-card-flip para mostrar más detalles de un héroe.
    const [flipped, setFlipped] = useState('');
    const handleFlipped = (name) => {
        //Al dar click en 'Detalles' de un héroe se envía su nombre. El cual se usa en una condición para dar vuelta la carta y mostrar los detalles.
        flipped === name ? setFlipped('') : setFlipped(name);
    }

    return (
        //Condición ternaria para mostrar los datos de los héroes o la página de Loading.
        heros.length !== 0 ?
            
        <div className="bg-dark">
            <div className="container-fluid h-100 ">
                <section className="row bg-dark">
                <h1 className="text-center text-primary" style={{display:heros.length !== 0 ? 'block' : 'none'}}>Equipo de superhéroes</h1>
                { 
                //mapeo para mostrar cada dato del héroe.      
                heros.map((hero) => {
                                
                    return(
                        <div className="col-sm-6 col-md-4 col-lg-4 my-3" key={hero.id}>
                        <div className="d-flex flex-column justify-content-between">
                            <section>
                                <h5 className="text-center text-white">{hero.name}</h5>
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
                                                <li className='list-group-item'><b>Combat:</b> {hero.powerstats.combat}</li>
                                                <li className='list-group-item'><b>Durability:</b> {hero.powerstats.durability}</li>
                                                <li className='list-group-item'><b>Intelligence:</b> {hero.powerstats.intelligence}</li>
                                                <li className='list-group-item'><b>Power:</b> {hero.powerstats.power}</li>
                                                <li className='list-group-item'><b>Speed:</b> {hero.powerstats.speed}</li>
                                                <li className='list-group-item'><b>Strength:</b> {hero.powerstats.strength}</li>
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

            
            <Powerstats heros={heros}/>
                   
            
        </div>
        
        :
        <Loading/>
        
        )
}

export default Hero