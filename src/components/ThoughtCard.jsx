import React from "react";
import styled from "styled-components";


//styling for components

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;  
  align-items: center;               
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  width: 40%;
  height: 100px;
  margin-bottom: 30px;
  background: #ffffff;
  border: 2px solid black;
  box-shadow: 10px 10px;
`;

const Message = styled.p`
margin: 0;
font-size: 20px;
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
text-align: left;
padding: 20px;
`;
const Footer = styled.div`
  display: flex;
  gap: 350px;
  margin-left: 50px;
  font-size: 14px;
  color: grey;
  background-color: none;
`;

const LikeButton = styled.span`
  display: flex;
  align-self: flex-start;
  background: #dad9d9;
  font-size: 12px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.1s;
  }
`;

//component 

const ThoughtCard = ({ thought, onLike }) => {
  const handleLike = () => onLike(thought.id);

  return (
    <PageWrapper>
      <Card>
        <Message>{thought.message}</Message>
        <Footer>
          <LikeButton onClick={handleLike}>❤️ x {thought.likes}</LikeButton>
          <span>{new Date(thought.createdAt).toLocaleTimeString()}</span>
        </Footer>
      </Card>
    </PageWrapper>
  );
};

export default ThoughtCard;