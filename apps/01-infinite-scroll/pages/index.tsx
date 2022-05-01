// eslint-disable-next-line import/no-unresolved
import { PokemonApi, Pokemon } from 'pokemon';
import React, { useCallback, useEffect, useState } from 'react';
import api from '../config';
import { Header, Main, Footer } from '../components';

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [limit, setLimit] = useState<number>(40);

  const fetchPokemons = useCallback(async (): Promise<void> => {
    try {
      const response = await api.get<PokemonApi>(`/pokemon?limit=${limit}`);
      const { results } = response.data;
      const responseList = Promise.all<Pokemon>(
        results.map(({ url }) =>
          fetch(url).then(pokemonDataResponse => pokemonDataResponse.json()),
        ),
      );
      const detailDataList = await responseList;
      setPokemons(detailDataList);
    } catch (error) {
      console.log('에러가 발생했어요...');
      console.error(error as Error);
    }
  }, [limit]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  return (
    <div>
      <Header />
      <Main pokemons={pokemons} />
      <Footer callback={() => setLimit(limit + 8)} />
    </div>
  );
};

export default Home;
