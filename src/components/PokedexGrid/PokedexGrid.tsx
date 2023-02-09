import React from 'react';
import { Pokemon } from '../../types/Pokemon';
import PokemonCard from '../PokemonCard/PokemonCard';

import './PokedexGrid.scss';

interface PokedexGridProps {
  data: Pokemon[];
}

const PokedexGrid: React.FC<PokedexGridProps> = ({ data }) => (
  <div className="pokedexgrid__container">
    {data.map(pokemon => (
      <PokemonCard key={pokemon.id} pokemon={pokemon} />
    ))}
  </div>
);

export default PokedexGrid;
