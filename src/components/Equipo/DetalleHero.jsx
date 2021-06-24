if(data.powerstats.combat <= 65 && data.powerstats.combat !== null && data.powerstats.power <= 65 && data.powerstats.power !== null && participantsMalos < 3){
    participantsMalos += 1;
    power.push(data);
}else if(participantsBuenos < 3 && data.powerstats.combat >= 66 && data.powerstats.combat !== null && data.powerstats.power >= 66 && data.powerstats.power !== null){
    participantsBuenos += 1;
    power.push(data);
}

if(data.powerstats.combat <= 65 && data.powerstats.power <= 65 && participantsMalos < 3){
                participantsMalos += 1;
                power.push(data);
            }else if(participantsBuenos < 3 && data.powerstats.combat >= 66 && data.powerstats.power >= 66){
                participantsBuenos += 1;
                power.push(data);
            }