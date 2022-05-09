// eslint-disable-next-line import/no-unresolved
import {Pokemon, PokemonApi} from 'pokemon';
import React, {useState} from 'react';
import api from '../config';
import {Footer, Header, Main} from '../components';
import {useQuery} from 'react-query';
import {queryClient} from "./_app";

const fetchPokemons = async (limit): Promise<Pokemon[]> => {
    try {
        const response = await api.get<PokemonApi>(`/pokemon?limit=${limit}`);
        const {results} = response.data;
        return Promise.all<Pokemon>(
            results.map(({url}) =>
                fetch(url).then(pokemonDataResponse => pokemonDataResponse.json()),
            ),
        );
    } catch (error) {
        console.log('에러가 발생했어요...');
        console.error(error as Error);
    }
};

const Home = () => {
    const [limit, setLimit] = useState<number>(40);
    const pokemons = useQuery(['pokemons'], () => fetchPokemons(limit), {
        onSuccess: (data) => {
            data?.map?.((pokemon) => {
                const cached = queryClient.getQueryData(['pokemon', pokemon.id]);
                if (!cached) {
                    queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
                }
            })
        },
    });

    return (
        <div>
            <Header/>
            <Main pokemons={pokemons.data}/>
            <Footer callback={() => setLimit(limit + 8)}/>
        </div>
    );
};

export default Home;
