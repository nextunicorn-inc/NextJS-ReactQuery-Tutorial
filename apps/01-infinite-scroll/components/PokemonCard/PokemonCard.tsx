import * as Styled from './PokemonCard.styled';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import {useQuery} from 'react-query';
import {queryClient} from '../../pages/_app';

type PokemonCardProps = {
  id: number;
};

export const PokemonCard = ({
  id,
}: PokemonCardProps) => {
  const router = useRouter();
  const pokemon = useQuery(['pokemon', id])?.data;

  const {
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
    liked,
  } = {
    name: pokemon?.name,
    habbitat: pokemon?.abilities?.[0]?.ability?.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon?.id}.gif`,
    type: pokemon?.types?.[0]?.type?.name,
    hp: pokemon?.stats?.[0]?.base_stat,
    attack: pokemon?.stats?.[1]?.base_stat,
    defense: pokemon?.stats?.[2]?.base_stat,
    special1: pokemon?.stats?.[3]?.base_stat,
    special2: pokemon?.stats?.[4]?.base_stat,
    speed: pokemon?.stats?.[5]?.base_stat,
    liked: pokemon?.liked,
  };

  const onClickCard = useCallback(() => {
    router.push({
      pathname: '/[id]',
      query: { id },
    })
  }, [id]);

  const onClickLike = (e) => {
    e.stopPropagation();
    queryClient.setQueryData(['pokemon', id], {
      ...pokemon,
      liked: !pokemon.liked,
    });
  };

  return (
      <Styled.PokemonCardContainer onClick={onClickCard}>
        <Styled.PokemonCard>
          <Styled.PokemonInfo>
            <p>#0{id}</p>
            <p>{type}</p>
          </Styled.PokemonInfo>
          <Styled.PokemonImageName>
            <img src={image} />
            <p>
              {name} - <span>{habbitat}</span>
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
        </Styled.PokemonCard>
        <Styled.LikeButton liked={liked} onClick={onClickLike} />
      </Styled.PokemonCardContainer>
  );
};
