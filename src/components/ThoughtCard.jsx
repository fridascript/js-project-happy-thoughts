import React from "react";
import styled from "styled-components";
import { formatTimestamp } from "../Data/timestampData";


//styling for components
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;  
  align-items: center;               
  width: 100%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;

  width: 90%;
  max-width: 620px;

  padding: 20px 0;
  min-height: 100px;
  margin-bottom: 30px;

  background: #ffffff;
  border: 2px solid black;
  box-shadow: 10px 10px;

  @media (min-width: 768px) {
    width: 100%;
  }

  @media (min-width: 1024px) {
    width: 100%;
  }

  @media (min-width: 1400px) {
    width: 100%;
  }
`;

const Message = styled.p`
  margin: 0;
  font-size: 18px;
  padding: 20px;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  padding: 10px 10px 10px 20px;
  font-size: 13px;
  color: grey;

  @media (min-width: 768px) {
    font-size: 14px;
      width: 90%;
      padding: 10px 20px 10px 40px;
  }
`;

const LikeButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  border-radius: 50%;

  background: ${(props) => (props.$liked ? "#f79f9f" : "#d5d3d3")};
  cursor: pointer;

  transition: transform 0.1s;

  &:hover {
    transform: scale(1.1);
  }

  @media (min-width: 768px) {
    width: 35px;
    height: 35px;
  }
`;


//component 

const ThoughtCard = ({ thought, onLike }) => {
  const handleLike = () => onLike(thought._id);

  return (
    <PageWrapper>
      <Card>
        <Message>{thought.message}</Message>
        <CardFooter>
          <div style={{ display: "flex", alignItems: "center" }}>
            <LikeButton
              onClick={handleLike}
              $liked={thought.hearts > 0}
            >
              ❤️
            </LikeButton>
            <span>x {thought.hearts}</span>
          </div>
          <span>{formatTimestamp(thought.createdAt)}</span>
        </CardFooter>
      </Card>
    </PageWrapper>
  );
};

export default ThoughtCard;