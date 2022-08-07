import { graphql } from 'msw';
import { PokemonsVariable, PokemonsResponse, Pokemons } from '../queries';
import db from './db.json';

export const handlers = [
  graphql.query<PokemonsResponse, PokemonsVariable>('Pokemons', (req, res, ctx) => {
    const { offset } = req.variables;
    const LIMIT = 20;

    return res(
      ctx.data({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        pokemons: db.slice(offset, offset + LIMIT) as Pokemons,
      }),
    );
  }),
];
