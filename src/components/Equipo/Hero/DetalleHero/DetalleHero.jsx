import React from 'react'

//Mostrar los detalles extra de cada héroe.
const DetalleHero = ({ hero }) => {
    console.log(hero)
    return (
        <div>
           <ul className='list-group '>
                <li className='list-group-item'><b>Race:</b> {hero.appearance.race}</li>
                <li className='list-group-item'><b>Height:</b> {hero.appearance.height[1]}</li>
                <li className='list-group-item'><b>Weight:</b> {hero.appearance.weight[1]}</li>
                <li className='list-group-item'><b>Hair color:</b> {hero.appearance["hair-color"]}</li>
                <li className='list-group-item'><b>Eyes color:</b> {hero.appearance["eye-color"]}</li>
                <li className='list-group-item'><b>Work:</b> {hero.work.occupation}</li>
            </ul> 
                    
        </div>
    )
}

export default DetalleHero
