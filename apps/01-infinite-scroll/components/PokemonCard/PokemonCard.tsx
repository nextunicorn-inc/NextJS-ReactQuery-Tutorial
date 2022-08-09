import { useRecoilState } from 'recoil';
import { LikePokemonCardListState } from '../../state/LikePokemonCardList'

import * as Styled from './PokemonCard.styled';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useRouter } from 'next/router'


type PokemonCardProps = {
  id: number;
  name: string;
  image: string;
  type: string;
  habbitat: string | null;
  hp: number;
  attack: number;
  defense: number;
  special1: number;
  special2: number;
  speed: number;
};

export const PokemonCard = ({
  id,
  name,
  image,
  type,
  habbitat,
  hp,
  attack,
  defense,
  special1,
  special2,
  speed,
}: PokemonCardProps) => {
  const router = useRouter();
  const isLikePage = router.pathname === '/like';

  const [likePokemonCardList, setLikePokemonCardList] = useRecoilState(
      LikePokemonCardListState,
  )

  const handleAddPokemon = (id) => {
    // 중복 추가 예외 로직 추가

    const newLikePokemonCardList = [
        ...likePokemonCardList,
      {
        id,
        name,
        image,
        type,
        habbitat,
        hp,
        attack,
        defense,
        special1,
        special2,
        speed,
      }
    ]

    setLikePokemonCardList(newLikePokemonCardList)
  }

  const handleRemovePokemon = (id) => {
    const newLikePokemonCardList = likePokemonCardList.filter((pokemon) => pokemon.id !== id);
    setLikePokemonCardList(newLikePokemonCardList)
  }

  return (
      <Styled.PokemonCardContainer>
        <Styled.PokemonCard>
          <Styled.PokemonInfo>
            <p>#0{id}</p>
            <p>{type}</p>
          </Styled.PokemonInfo>
          <Styled.PokemonImageName>
            <img src={image} />
            <p>
              {name} - {habbitat && <span>{habbitat}</span>}
            </p>
          </Styled.PokemonImageName>
          <Styled.Box>
            <div className="slider">
              <p>HP</p>
              <Slider
                  max={300}
                  value={hp}
                  trackStyle={{ backgroundColor: '#dff72a' }}
                  railStyle={{ backgroundColor: '#bfcee2' }}
              />
            </div>
            <div className="slider">
              <p>Ataque</p>
              <Slider
                  max={300}
                  value={attack}
                  trackStyle={{ backgroundColor: '#ff0000' }}
                  railStyle={{ backgroundColor: '#bfcee2' }}
              />
            </div>
            <div className="slider">
              <p>Defesa</p>
              <Slider
                  max={300}
                  value={defense}
                  trackStyle={{ backgroundColor: '#3653f6' }}
                  railStyle={{ backgroundColor: '#bfcee2' }}
              />
            </div>
            <div className="slider">
              <p>Especial 1</p>
              <Slider
                  max={300}
                  value={special1}
                  trackStyle={{ backgroundColor: '#ff9700' }}
                  railStyle={{ backgroundColor: '#bfcee2' }}
              />
            </div>
            <div className="slider">
              <p>Especial 2</p>
              <Slider
                  max={300}
                  value={special2}
                  trackStyle={{ backgroundColor: '#ff4f00' }}
                  railStyle={{ backgroundColor: '#bfcee2' }}
              />
            </div>
            <div className="slider">
              <p>Velocidade</p>
              <Slider
                  max={300}
                  value={speed}
                  trackStyle={{ backgroundColor: '#2c103f' }}
                  railStyle={{ backgroundColor: '#bfcee2' }}
              />
            </div>
          </Styled.Box>
          <Styled.LikeBox>
            {isLikePage ? (
                <button
                    onClick={() => handleRemovePokemon(id)}
                >❌</button>
            ) : (
                <button
                    onClick={() => handleAddPokemon(id)}
                >➕</button>
            )}

          </Styled.LikeBox>
        </Styled.PokemonCard>
      </Styled.PokemonCardContainer>
  )
}



