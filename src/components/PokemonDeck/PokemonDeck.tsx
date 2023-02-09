import React, { useEffect, useState } from 'react';
import PubSub from 'pubsub-js';

import { Pokemon } from '../../types/Pokemon';
import { eventNames, localStorageKeys } from '../../constants';
import PokemonCard from '../PokemonCard/PokemonCard';

import './PokemonDeck.css';

const PokemonDeck: React.FC = () => {
  const buttonStates = {
    default: 'Save Deck',
    saved: 'Saved!'
  }

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon[]>([])
  const [deckSaving, setDeckSaving] = useState(false)
  const [buttonText, setButtonText] = useState(buttonStates.default)
  const hasPokemonSelected = selectedPokemon.length;

  useEffect(() => {
    const cardSelected = PubSub.subscribe(eventNames.CARD_SELECTED, (_msg: string, value: Pokemon) =>
      selectCard(value)
    );
    const cardDeselected = PubSub.subscribe(eventNames.CARD_DESELECTED, (_msg: string, value: Pokemon) =>
      deselectCard(value)
    );

    return () => {
      PubSub.unsubscribe(cardSelected);
      PubSub.unsubscribe(cardDeselected);
    };
  }, [selectedPokemon]);

  useEffect(() => {
    const savedDeck = localStorage.getItem(localStorageKeys.POKEMON_DECK_1)
    if (savedDeck) {
      setSelectedPokemon(JSON.parse(savedDeck));
    }
  }, []);

  const selectCard = (pokemon: Pokemon): void => {
    const alreadyIncluded = selectedPokemon.some(p => p.id === pokemon.id);
  
    if (alreadyIncluded) {
      PubSub.publish(eventNames.CARD_ALREADY_INCLUDED, 'That card is already in your deck');
    } else if (selectedPokemon.length >= 5) {
      PubSub.publish(eventNames.CARD_LIMIT_REACHED, "You've reached your deck size limit");
    } else {
      setSelectedPokemon([...selectedPokemon, pokemon]);
    }
  };

  const deselectCard = (pokemon: Pokemon): void => {
    setSelectedPokemon(selectedPokemon.filter(p => p.id !== pokemon.id));
  };

  const handleSaveDeck = () => {
    setDeckSaving(true);
    localStorage.setItem(localStorageKeys.POKEMON_DECK_1, JSON.stringify(selectedPokemon));
    setButtonText(buttonStates.saved);

    setTimeout(() => {
      setDeckSaving(false);
      setButtonText(buttonStates.default);
    }, 2000);
  };

  return (
    <>
      {!hasPokemonSelected && (
        <div className="pokemon-deck__tip__background">
          <h3>Click a pokemon to get started!</h3>
        </div>
      )}
      {hasPokemonSelected && (
        <>
          <div className="pokemon-deck__container">
            {selectedPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} selected />
            ))}
          </div>
          <div className="pokemon-deck_button__container">
            <button
              aria-label={buttonText}
              onClick={handleSaveDeck}
              className={`${deckSaving ? 'saved' : ''} pokemon-deck_save__button`}
            >
              {buttonText}
            </button>
          </div>
        </>
      )}
    </>
  );
};


export default PokemonDeck;
