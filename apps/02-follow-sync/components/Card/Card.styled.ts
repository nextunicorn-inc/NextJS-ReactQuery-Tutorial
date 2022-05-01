import styled from '@emotion/styled';

export const Card = styled.div`
  position: relative;
  width: 350px;
  height: 190px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 35px 80px rgba(0, 0, 0, 0.15);
  transition: 0.5s;

  &:hover {
    height: 450px;

    .imageBox {
      width: 250px;
      height: 250px;
    }

    .details {
      transform: translateY(0px);
    }
  }
`;

export const ImageBox = styled.div`
  position: absolute;
  left: 50%;
  top: -50px;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  transition: 0.5s;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ContentBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
`;

export const DetailsBox = styled.div`
  padding: 40px;
  text-align: center;
  width: 100%;
  transition: 0.5s;
  transform: translateY(150px);

  h2 {
    font-size: 1.25em;
    font-weight: 600;
    color: #555555;
    line-height: 1.2em;

    span {
      font-size: 0.75em;
      font-weight: 500;
      opacity: 0.5;
    }
  }
`;

export const DataBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  h3 {
    font-size: 1em;
    color: #555555;
    line-height: 1.2em;
    font-weight: 600;

    span {
      font-size: 0.85em;
      font-weight: 400;
      opacity: 0.5;
    }
  }
`;

export const ActionButtonBox = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    padding: 10px 30px;
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 1em;
    font-weight: 500;
    background: #ff5f95;
    color: #ffffff;
    cursor: pointer;

    &:nth-of-type(2) {
      border: 1px solid #999999;
      color: #999999;
      background: #ffffff;
    }
  }
`;
