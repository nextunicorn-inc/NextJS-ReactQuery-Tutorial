import React from 'react';
import * as Styled from './Footer.styled';

type FooterProps = {
  callback: () => void;
};

export const Footer = ({ callback }: FooterProps) => {
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(event);
    callback();
  };

  return (
    <Styled.FooterLayout>
      <Styled.Button onClick={handleOnClick}>
        <p>더 가져오기</p>
      </Styled.Button>
    </Styled.FooterLayout>
  );
};
