import styled from '@emotion/styled';

export const MainLayout = styled.div`
  width: 100%;
  height: auto;
  justify-content: center;
  display: flex;
  margin-top: 30px;
  padding: 2rem 0.5rem;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

export const CardContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  transition: 0.5s;

  &:hover {
    transform: scale(1.1);
    transition: 0.5s;
  }
`;
