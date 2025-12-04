import React, { useState } from "react";
import styled from "styled-components";

// --- Styled Components ---

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;  
  align-items: center;                  
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 260px;
  margin: 60px 30px;
  background: #e8e7e7;
  border: 2px solid black;
  box-shadow: 10px 10px;
`;

const Title = styled.h2`
font-size: 16px;
font-weight: normal;
display: flex;
align-self: flex-start;
margin-left: 30px;
margin-bottom: 5px;
margin-top: 5px;
;`


const TextArea = styled.textarea`
  width: 85%;
  min-height: 100px;
  padding: 12px;
  font-size: 16px;
`;


const Button = styled.button`
  align-self: flex-start;
  margin-top: 10px;
  margin-left: 30px;
  background: #ffbbbb;
  color: #000000;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  border-radius: 12px;
  cursor: pointer;
 transition: transform 0.2s ease;
  &:hover {
  transform: scale(1.1); 
  }
`;

const ThoughtForm = ({ onAddThought }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() === "") return; // optional: ignore empty messages
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
