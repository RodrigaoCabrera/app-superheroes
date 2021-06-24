import React, { useEffect, useState } from 'react'

const Powerstats = ({ heros }) => {

    const [powerstats, setPowerstats] = useState([]);
    console.log(powerstats)
    useEffect(() => {
        
            const powerstatsLevel = () => {
                let allPowerstats = [{
                    'combat':[],
                    'durability':[],
                    'intelligence':[],
                    'power':[],
                    'speed':[],
                    'strength':[]

                }]
                heros.map(hero =>{
                    allPowerstats = [{
                        'combat':String([...allPowerstats[0].combat, (hero.powerstats.combat === 'null' ? '0' : hero.powerstats.combat)].reduce((a, v)  => Number(a) + Number(v))).split(),
                        
                        'durability':String([...allPowerstats[0].durability, hero.powerstats.durability !== 'null' ? hero.powerstats.durability : '0'].reduce((a, v)  => Number(a) + Number(v))).split(),
                        'intelligence':String([...allPowerstats[0].intelligence, hero.powerstats.intelligence !== 'null' ? hero.powerstats.intelligence : '0'].reduce((a, v)  => Number(a) + Number(v))).split(),
                        'speed':String([...allPowerstats[0].speed, hero.powerstats.speed !== 'null' ? hero.powerstats.speed : '0'].reduce((a, v)  => Number(a) + Number(v))).split(),
                        'strength':String([...allPowerstats[0].strength, hero.powerstats.strength !== 'null' ? hero.powerstats.strength : '0'].reduce((a, v)  => Number(a) + Number(v))).split(),
                    }]
                })
                setPowerstats(allPowerstats)
            }
            powerstatsLevel();
        
    }, [heros])
    
    return (
        <div>
        </div>
    )
}

export default Powerstats
