import React, { useEffect, useState } from 'react';
import PowerLevel from './PowerLevel';
import { useHeros } from '../../../Context/HerosContext';

const Powerstats = () => {
    const { heros, powerstatsLevel, powerstats } = useHeros();


    useEffect(() => {
        powerstatsLevel();
        console.log(powerstats)
    }, [heros]);

    return (
        <div className='container py-3 border-rounded'>
            <h2 className="text-center my-3 text-primary" style={{ display: heros.length !== 0 ? 'block' : 'none' }}>Nivel de poder del equipo</h2>
            <PowerLevel />
        </div>
    )
}

export default Powerstats
