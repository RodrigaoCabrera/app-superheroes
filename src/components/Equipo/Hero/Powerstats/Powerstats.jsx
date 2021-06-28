import React, { useEffect, useState } from 'react';
import PowerLevel from './PowerLevel';

const Powerstats = ({ heros }) => {

    const [powerstats, setPowerstats] = useState([]);
    
    useEffect(() => {
        
            const powerstatsLevel = () => {
                let allPowerstats = [{
                    'combat':[],
                    'durability':[],
                    'intelligence':[],
                    'power':[],
                    'speed':[],
                    'strength':[]

                }];
                try {
                    heros.map(hero =>{
                        return (
                            //Uso de reduce para sumar los puntos delos diferentes poderes de los héroes que conforman el equipo.Y luego split() para formar un array del número obtenido para guardarlo en la constante 'alPowerstats' de más arriba.
                            allPowerstats = [{
                                'combat':String([...allPowerstats[0].combat, (hero.powerstats.combat === 'null' ? '0' : hero.powerstats.combat)].reduce((a, v)  => Number(a) + Number(v))).split(),
                                
                                'durability':String([...allPowerstats[0].durability, hero.powerstats.durability !== 'null' ? hero.powerstats.durability : '0'].reduce((a, v)  => Number(a) + Number(v))).split(),
    
                                'intelligence':String([...allPowerstats[0].intelligence, hero.powerstats.intelligence !== 'null' ? hero.powerstats.intelligence : '0'].reduce((a, v)  => Number(a) + Number(v))).split(),
    
                                'speed':String([...allPowerstats[0].speed, hero.powerstats.speed !== 'null' ? hero.powerstats.speed : '0'].reduce((a, v)  => Number(a) + Number(v))).split(),
    
                                'power':String([...allPowerstats[0].power, hero.powerstats.power !== 'null' ? hero.powerstats.power : '0'].reduce((a, v)  => Number(a) + Number(v))).split(),
    
                                'strength':String([...allPowerstats[0].strength, hero.powerstats.strength !== 'null' ? hero.powerstats.strength : '0'].reduce((a, v)  => Number(a) + Number(v))).split(),
                            }]
                        )
                    })
                    setPowerstats(allPowerstats) 
                } catch (error) {
                    console.log(error)
                }
                
            }
            powerstatsLevel();
        
    }, [heros])
    
    return (
        <div className='container py-3 border-rounded'>
            <h2 className="text-center my-3 text-primary" style={{display:heros.length !== 0 ? 'block' : 'none'}}>Nivel de poder del equipo</h2>
            <PowerLevel powerstats={powerstats} />
        </div>
    )
}

export default Powerstats
