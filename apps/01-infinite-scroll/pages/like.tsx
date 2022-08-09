import { useRecoilValue } from 'recoil';
import { LikePokemonCardListState } from '../state/LikePokemonCardList'
import styled from '@emotion/styled';

import { PokemonCard } from "../components";

const LikeWrapper = styled.div`
  width: 100%;
  height: auto;
  justify-content: center;
  display: flex;
  margin-top: 30px;
  padding: 2rem 0.5rem;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`

const LikeContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  transition: 0.5s;

  &:hover {
    transform: scale(1.1);
    transition: 0.5s;
  }
`;

const LikePage = () => {
    const likePokemonList = useRecoilValue(LikePokemonCardListState);
    console.log(likePokemonList)

    return (
        <LikeWrapper>
            {likePokemonList.map((likePokemon) => (
                <LikeContainer key={likePokemon.id}>
                    <PokemonCard
                        id={likePokemon.id}
                        name={likePokemon.name}
                        habbitat={likePokemon.habitAts?.name ?? null}
                        image={likePokemon.image}
                        type={likePokemon.type}
                        hp={likePokemon.hp}
                        attack={likePokemon.attack}
                        defense={likePokemon.defense}
                        special1={likePokemon.special1}
                        special2={likePokemon.special2}
                        speed={likePokemon.speed}
                    />
                </LikeContainer>
            ))}
        </LikeWrapper>
    )
}

export default LikePage
