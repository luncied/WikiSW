let chardb = require('../assets/data/characters');
let planetsdb = require('../assets/data/planets');
let speciesdb = require('../assets/data/species');
let starshipsdb = require('../assets/data/starships');
let vehiclesdb = require('../assets/data/vehicles');
let charList = [];
let planetList = [];
let speciesList = [];
let starshipsList = [];
let vehiclesList = [];

for(character in chardb){
    charList.push(chardb[character].name)
}

for(planet in planetsdb){
    planetList.push(planetsdb[planet].name)
}

for(species in speciesdb){
    speciesList.push(speciesdb[species].name)
}

for(starships in starshipsdb){
    starshipsList.push(starshipsdb[starships].name)
}

for(vehicles in vehiclesdb){
    vehiclesList.push(vehiclesdb[vehicles].name)
}

console.log(charList.length) //87
console.log(charList)

console.log(planetList.length) //61
console.log(planetList)

console.log(speciesList.length) //37
console.log(speciesList)

console.log(starshipsList.length) //37
console.log(starshipsList)

console.log(vehiclesList.length) //39
console.log(vehiclesList)




