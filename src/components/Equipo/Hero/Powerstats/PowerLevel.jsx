import React from 'react'

const PowerLevel = ({ powerstats }) => {

    const handleClassification = () => {
        
        let differentPowers = [];
        let greaterPower;
        let classificatioByPower = [];
        
        powerstats.map((power) => {
            
            differentPowers = [...power.combat, ...power.speed, ...power.intelligence, ...power.power, ...power.strength, ...power.durability];
            greaterPower = Math.max(...differentPowers);
            return(
                differentPowers.map((index) => {
                    switch (String(greaterPower)) {
                        case differentPowers[0]:
                            differentPowers = differentPowers.filter(f => f !== String(greaterPower));
                            greaterPower = Math.max(...differentPowers);
                            classificatioByPower = [...classificatioByPower, {'Combat':powerstats[0].combat[0]}]
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
                })
            )
        });

        if(classificatioByPower.length !== 0){
            return (
                <section className="row">
                        <div className='col-2 list-group-item'>{Object.getOwnPropertyNames(classificatioByPower[0])[0]}: {Object.values(classificatioByPower[0])[0]}</div>
                        <div className='col-2 list-group-item'>{Object.getOwnPropertyNames(classificatioByPower[1])[0]}: {Object.values(classificatioByPower[1])[0]}</div>
                        <div className='col-2 list-group-item'>{Object.getOwnPropertyNames(classificatioByPower[2])[0]}: {Object.values(classificatioByPower[2])[0]}</div>
                        <div className='col-2 list-group-item'>{Object.getOwnPropertyNames(classificatioByPower[3])[0]}: {Object.values(classificatioByPower[3])[0]}</div>
                        <div className='col-2 list-group-item'>{Object.getOwnPropertyNames(classificatioByPower[4])[0]}: {Object.values(classificatioByPower[4])[0]}</div>
                        <div className='col-2 list-group-item'>{Object.getOwnPropertyNames(classificatioByPower[5])[0]}: {Object.values(classificatioByPower[5])[0]}</div>
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
