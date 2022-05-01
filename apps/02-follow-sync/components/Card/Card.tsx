import * as Styled from './Card.styled';

const Card = () => (
  <Styled.Card>
    <Styled.ImageBox className="imageBox">
      <img src="https://avatars.githubusercontent.com/u/103583841?s=200&v=4" alt="logo" />
    </Styled.ImageBox>
    <Styled.ContentBox className="content">
      <Styled.DetailsBox className="details">
        <h2>
          넥스트유니콘
          <br />
          <span>© nextunicorn Inc.</span>
        </h2>
        <Styled.DataBox className="data">
          <h3>
            25.3k
            <br />
            <span>Posts</span>
          </h3>
          <h3>
            10.5k
            <br />
            <span>Followers</span>
          </h3>
          <h3>
            1053
            <br />
            <span>Following</span>
          </h3>
        </Styled.DataBox>
        <Styled.ActionButtonBox>
          <button type="button">Follow</button>
          <button type="button">Message</button>
        </Styled.ActionButtonBox>
      </Styled.DetailsBox>
    </Styled.ContentBox>
  </Styled.Card>
);

export default Card;
