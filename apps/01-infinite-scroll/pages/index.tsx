import { useEffect, useState } from 'react';
import client from '../config/graphql';
import { Pokemons, PokemonsResponse, POKEMONS, PokemonsVariable } from 'queries';
import { Header, Main, Footer } from '../components';

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemons>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function fetching() {
      const response = await client.request<PokemonsResponse, PokemonsVariable>({
        document: POKEMONS,
        variables: { offset },
        requestHeaders: {
          'Content-Type': 'application/json',
          'X-Method-Used': 'graphql',
        },
        signal: controller.signal,
      });
      setPokemons(prev => prev.concat(response.pokemons));
    }

    fetching();

    return () => {
      controller.abort();
    };
  }, [offset]);

  return (
    <div>
      <Header />
      <Main pokemons={pokemons} />
      <Footer callback={() => setOffset(prev => prev + 20)} />
    </div>
  );
};

export default Home;
