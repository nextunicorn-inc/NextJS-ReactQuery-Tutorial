type PokemonInfo = {
  types: PokemonType[];
  stats: PokemonStatus[];
  abilities: PokemonAbility[];
};

type PokemonType = {
  type: {
    name: string;
  };
};

type PokemonStatus = {
  base: number;
};

type PokemonAbility = {
  ability: {
    name: string;
  };
};
export type Pokemon = {
  name: string;
  id: number;
  habitAts: {
    name: string;
  } | null;
  info: [PokemonInfo];
};

export type PokemonsResponse = {
  pokemons: Pokemons;
};
export type Pokemons = Pokemon[];
export type PokemonsVariable = {
  offset: number;
};
