import React from 'react';
import Link from 'next/link'
import {HeaderContainer, HeaderMenu} from './Header.styled';

export const Header = () => (
  <HeaderContainer>
    <a href="/">
      <img
        src="https://fontmeme.com/permalink/210504/3298fd6b7d2656d4bda6d5822feb2cac.png"
        alt="fonte-de-pokemon"
      />
    </a>
    <Link href="/like">
      <HeaderMenu>
          ✔
      </HeaderMenu>
    </Link>
  </HeaderContainer>
);
