import { CardTypes } from "../types/Types";
import styled from "@emotion/styled";
import iconTime from "../images/icon-time.svg";
import LikeOutline from "../images/icon-favorite-outline.svg"
import LikeFill from "../images/icon-favorite-fill.svg"

const ItemList = styled.li`
  all: unset;
  opacity: 0.8;
  border-radius: 6px;
  border: solid 1px #979797;
  background-color: #fff;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  margin-bottom: 20px;
  &:hover {
    opacity: 0.6;
  }
`;
const Link = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 26px;
  text-decoration: none;
`;
const Title = styled.h2`
  font-size: 0.875rem;
  color: #6b6b6b;
  font-weight: 500;
  line-height: 1.43;
  letter-spacing: 0.25px;
  margin-bottom: 0;
`;
const Time = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.688rem;
  color: #767676;
  & img {
    width: 16px;
  }
`;
const Like = styled.div`
  background-color: #6060600f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  & img {
    cursor: pointer;
  }
`;

function Card({ title, url, created_at, click, favorite }: CardTypes) {
  return (
    <ItemList>
      <Link href={url} target="_blank" rel="noopener noreferrer">
        <Time>
          <img src={iconTime} alt="icon clock" />
          {created_at}
        </Time>
        <Title>{title}</Title>
      </Link>
      <Like>
        {favorite? (
          <img src={LikeFill} alt="Heart fill" onClick={click} />
        ) : (
          <img src={LikeOutline} alt="Heart Outline" onClick={click} />
        )}
      </Like>
    </ItemList>
  );
}

export default Card;
