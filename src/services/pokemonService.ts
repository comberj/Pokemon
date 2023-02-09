// import { Pokemon } from 'src/types/Pokemon';
import { Pokemon } from '../types/Pokemon'
import pokemonJson from '../pokemon.json'

export const fetchPokemon = ():Pokemon[] => {
  return pokemonJson.map(pokemon => ({
    id: pokemon?.id,
    name: pokemon.name,
    types: pokemon?.types.map(obj => obj.type.name),
    sprite: pokemon?.sprites?.front_default
  }))
}