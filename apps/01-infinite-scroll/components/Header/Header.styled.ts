import styled from '@emotion/styled';

export const HeaderContainer = styled.div`
  display: flex;
  height: 4rem;
  background-color: var(--header-color);
  width: 100%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.219);
  justify-content: center;
  align-items: center;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;

    img {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 47%;
    }
  }

  input {
    margin-left: 10px;
    width: 15rem;
    height: 20px;
    align-items: center;
    display: flex;
    border-radius: 10px 0 0 10px;
    border: none;
  }

  button {
    height: 20px;
    border-radius: 0 10px 10px 0;
    border: none;
    width: 90px;
  }
`;
