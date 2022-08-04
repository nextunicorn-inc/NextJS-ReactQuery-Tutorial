import { Pokemons } from 'queries';

import * as Styled from './Main.styled';
import { PokemonCard } from '../PokemonCard/PokemonCard';

type MainProps = {
  pokemons: Pokemons;
};

export const Main = ({ pokemons }: MainProps) => (
  <Styled.MainLayout>
    {pokemons.map(pokemon => {
      const [info] = pokemon.info;
      return (
        <Styled.CardContainer key={pokemon.id}>
          <PokemonCard
            id={pokemon.id}
            name={pokemon.name}
            habbitat={pokemon.habitAts?.name ?? null}
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`}
            type={info.types[0].type.name}
            hp={info.stats[0].base}
            attack={info.stats[1].base}
            defense={info.stats[2].base}
            special1={info.stats[3].base}
            special2={info.stats[4].base}
            speed={info.stats[5].base}
          />
        </Styled.CardContainer>
      );
    })}
  </Styled.MainLayout>
);
