import { Pokemon } from '../types/Pokemon'
import pokemonJson from '../pokemon.json'

export const fetchPokemon = ():Pokemon[] => {
  // If I had more time I would create a separate app, acting as a server, in the same project.
  // My "front-end" would communicate with this separate app, which would respond with the JSON.
  return pokemonJson.map(pokemon => ({
    id: pokemon?.id,
    name: pokemon.name,
    types: pokemon?.types.map(obj => obj.type.name),
    sprite: pokemon?.sprites?.front_default
  }))
}