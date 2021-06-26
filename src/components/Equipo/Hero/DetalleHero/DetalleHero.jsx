import React, {useEffect } from 'react'

const DetalleHero = ({ hero }) => {
    return (
        <div>
           <ul className='list-group'>
                <li className='list-group-item'>Race: {hero.appearance.race}</li>
                <li className='list-group-item'>Height: {hero.appearance.height[1]}</li>
                <li className='list-group-item'>Weight: {hero.appearance.weight[1]}</li>
                <li className='list-group-item'>Hair color: {hero.appearance["hair-color"]}</li>
                <li className='list-group-item'>Eyes color: {hero.appearance["eyes-color"]}</li>
                <li className='list-group-item'>Work: {hero.work.occupation}</li>
            </ul> 
                    
        </div>
    )
}

export default DetalleHero
