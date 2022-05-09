import {PokemonCard} from "../components";
import { useRouter } from 'next/router';

function Id() {
    const { query } = useRouter();

    return (
        <PokemonCard
            id={parseInt(query.id, 10)}
        />
    );
}

export default Id;
