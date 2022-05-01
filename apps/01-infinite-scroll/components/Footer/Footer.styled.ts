import styled from '@emotion/styled';

export const FooterLayout = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 50px;
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  justify-content: center;
  width: 190px;
  height: 40px;
  background-image: url('https://image.flaticon.com/icons/png/512/188/188917.png');
  overflow: hidden;
  cursor: pointer;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  transition: 0.5s;

  &:hover {
    transform: rotate(29deg);
    transition: 0.5s;
  }
`;
