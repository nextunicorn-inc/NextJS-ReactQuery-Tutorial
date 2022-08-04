import { gql } from 'graphql-request';
export const POKEMONS = gql`
  query Pokemons($offset: Int!) {
    pokemons: pokemon_v2_pokemonspecies(offset: $offset, limit: 20, order_by: { id: asc }) {
      name
      id
      habitAt: pokemon_v2_pokemonhabitat {
        name
      }
      info: pokemon_v2_pokemons {
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
        stats: pokemon_v2_pokemonstats {
          base: base_stat
        }
        abilities: pokemon_v2_pokemonabilities {
          ability: pokemon_v2_ability {
            name
          }
        }
      }
    }
  }
`;
