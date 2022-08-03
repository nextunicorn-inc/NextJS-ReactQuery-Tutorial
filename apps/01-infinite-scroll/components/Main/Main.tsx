import { Pokemon } from 'pokemon';
import * as Styled from './Main.styled';
import { PokemonCard } from '../PokemonCard/PokemonCard';

type MainProps = {
  pokemons: Pokemon[];
};

export const Main = ({ pokemons }: MainProps) => (
  <Styled.MainLayout>
    {pokemons.map(pokemon => (
      <Styled.CardContainer>
        <PokemonCard
          id={pokemon.id}
          name={pokemon.name}
          habbitat={pokemon.abilities[0].ability.name}
          image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`}
          type={pokemon.types[0].type.name}
          key={pokemon.id}
          hp={pokemon.stats[0].base_stat}
          attack={pokemon.stats[1].base_stat}
          defense={pokemon.stats[2].base_stat}
          special1={pokemon.stats[3].base_stat}
          special2={pokemon.stats[4].base_stat}
          speed={pokemon.stats[5].base_stat}
        />
      </Styled.CardContainer>
    ))}
  </Styled.MainLayout>
);
