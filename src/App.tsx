import React from 'react';
import './App.css';
import PokemonDeck from './components/PokemonDeck/PokemonDeck';
import PokedexGrid from './components/PokedexGrid/PokedexGrid';
import Toaster from './components/Toaster/Toaster';
import { fetchPokemon } from './services/pokemonService';

function App() {

  const pokemonData = fetchPokemon();

  return (
    <div className="App">
      <Toaster/>
      <div className="container">
        <PokemonDeck/>
        <PokedexGrid data={pokemonData}/>
      </div>
    </div>
  );
}

export default App;
