// eslint-disable-next-line import/no-unresolved
import { Pokemon } from 'pokemon';
import * as Styled from './Main.styled';
import { PokemonCard } from '../PokemonCard/PokemonCard';

type MainProps = {
  pokemons: Pokemon[];
};

export const Main = ({ pokemons }: MainProps) => (
  <Styled.MainLayout>
    {pokemons?.map?.(pokemon => (
      <Styled.CardContainer>
        <PokemonCard
          id={pokemon.id}
        />
      </Styled.CardContainer>
    ))}
  </Styled.MainLayout>
);
