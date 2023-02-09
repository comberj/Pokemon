import React from 'react';
import PokemonDeck from './components/PokemonDeck/PokemonDeck';
import PokedexGrid from './components/PokedexGrid/PokedexGrid';
import Toaster from './components/Toaster/Toaster';
import { fetchPokemon } from './services/pokemonService';

import './App.scss';

function App() {

  const pokemonData = fetchPokemon();

  return (
    <div className="app">
      <Toaster/>
      <div className="container">
        <h1 className="app__header">POKEDEX</h1>
        <PokemonDeck/>
        <PokedexGrid data={pokemonData}/>
      </div>
    </div>
  );
}

export default App;
