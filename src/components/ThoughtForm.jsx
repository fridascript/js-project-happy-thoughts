import React, { useState } from "react";
import styled from "styled-components";

// styling for components

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;  
  align-items: center;                  
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 90%;
  max-width: 600px;
  height: auto;
  padding: 20px;
  margin: 40px 10px;

  background: #e8e7e7;
  border: 2px solid black;
  box-shadow: 10px 10px;

  @media (min-width: 768px) {
    width: 70%;
  }

  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const Title = styled.h2`
  font-size: 14px;
  align-self: flex-start;
  margin-left: 20px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const TextArea = styled.textarea`
  width: 85%;
  min-height: 90px;
  padding: 12px;
  font-size: 14px;

  @media (min-width: 768px) {
    min-height: 110px;
    font-size: 16px;
  }
`;

const Button = styled.button`
  align-self: flex-start;
  margin-top: 15px;
  margin-left: 20px;
  background: #ffbbbb;
  color: #000000;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 12px;
  cursor: pointer;

  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (min-width: 768px) {
    font-size: 15px;
  }
`;


//component 
const ThoughtForm = ({ onAddThought }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() === "") return; //ignores empty messages
    onAddThought(message);
    setMessage("");
  };

  return (
    <PageWrapper>
      <Form onSubmit={handleSubmit}>
        <Title>What's making you happy right now?
        </Title>
        <TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your happy thought..."
        />
        <Button type="submit"> ❤️ Send Happy Thought ❤️ </Button>
      </Form>
    </PageWrapper>
  );
};

export default ThoughtForm;
