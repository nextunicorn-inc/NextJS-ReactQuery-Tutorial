import styled from '@emotion/styled';

export const PokemonCardContainer = styled.div`
  background: linear-gradient(to right, #0179a3, #02013a);
  padding: 2px;
  border-radius: 10px;
  display: flex;
  width: 260px;
  height: 350px;
  margin-bottom: 30px;

  .rc-slider-handle {
    display: none;
    border: none;
    width: 0;
    height: 0;
  }

  .rc-slider-rail {
    border-radius: 0px;
  }
  .rc-slider-track {
    border-radius: 0px;
  }
`;

export const PokemonCard = styled.div`
  width: 255px;
  height: 346px;
  display: flex;
  background-color: rgb(46, 46, 66);
  border-radius: 10px;
  flex-direction: column;
  box-shadow: 0 0 6px 0.2px #00000031;
  border: 2px solid #0000003a;
`;

export const PokemonInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 230px;
  margin: 10px;
  flex-direction: row;
  text-align: center;

  p {
    border-radius: 5px;
    min-width: 50px;
    margin-top: 15px;
    color: white;
    font-size: 19px;
    text-shadow: -1px 1px 1px #13131365;
  }

  p:nth-child(2) {
    background-color: rgba(255, 255, 255, 0.13);
    border-radius: 5px;
    min-width: 50px;
    margin-top: 15px;
    color: white;
  }
`;

export const PokemonImageName = styled.div`
  display: flex;
  width: 100%;
  height: 45%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  img {
    justify-content: center;
    display: flex;
    align-items: center;
    margin-top: -235px;
    height: 115px;
    width: 120px;
    // background-image: url("https://image.flaticon.com/icons/png/512/188/188917.png");
    // background-position: center;
    // background-repeat: no-repeat;
    // background-size: contain;
  }

  p {
    text-transform: capitalize;
    color: white;
    font-size: 17px;
    background-color: rgba(255, 255, 255, 0.13);
    border-radius: 5px;
    margin-top: 10px;
    width: 70%;
    text-shadow: -1px 1px 1px #1313137a;
  }

  span {
    font-size: 14px;
    border-radius: 2px;
    min-width: 100px;
  }
`;

export const Box = styled.div`
  width: 100%;
  height: 190px;
  display: flex;
  margin-top: -110px;
  align-items: center;
  flex-direction: column;

  .slider {
    width: 90%;
    justify-content: center;
    display: flex;
    flex-direction: column;

    p {
      color: white;
      text-shadow: -1px 1px 1px #131313c4;
    }

    .rc-slider-handle {
      display: none;
      border: none;
      width: 0;
      height: 0;
    }
  }
`;

export const LikeBox = styled.div`
  width: 100%;
  display: flex;
  margin-top: 16px;
  justify-content: center;
  
  button {
    width: 26px;
    height: 26px;
  }
`
