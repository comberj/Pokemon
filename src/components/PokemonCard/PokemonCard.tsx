import React, { KeyboardEvent } from 'react';
import { eventNames } from '../../constants';
import { Pokemon } from '../../types/Pokemon';
import PubSub from 'pubsub-js';

import './PokemonCard.css';

interface PokemonCardProps {
  pokemon: Pokemon;
  selected?: boolean;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, selected = false }) => {
  const handleCardClicked = () => {
    const eventName = selected ? eventNames.CARD_DESELECTED : eventNames.CARD_SELECTED;
    PubSub.publish(eventName, pokemon);
  };

  const handleOnKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClicked();
    }
  };
  
  const randomKeyGenerator = ():string => {
    return (Math.random() + 1).toString(36).substring(7);
  }

  return (
    <div
      tabIndex={0}
      onKeyDown={handleOnKeyDown}
      onClick={handleCardClicked}
      className={`${pokemon.types[0]} card__container`}
    >
      <div className="card-sprite__container">
        <img alt={`The pokemon ${pokemon.name}`} src={pokemon.sprite} />
      </div>
      <p className="card-name__container" aria-label={pokemon.name}>
        {pokemon.name.toUpperCase()}
      </p>
      <div className="card-type__container">
        {pokemon.types.map(type => (
          <div key={randomKeyGenerator()} className="card-type__item">
            <img
              alt={type}
              className="card-type__image"
              src={require(`../../images/${type}_symbol.png`)}
            />
            <span className="card-type__tip" aria-label={type}>
              {type}
            </span>
          </div>
        ))}
      </div>
      <div className="card-footer__container">
        <span>ID: {pokemon.id}</span>
      </div>
    </div>
  );
};

export default PokemonCard;
