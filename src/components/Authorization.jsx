import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import styled from "styled-components";


//styling

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 10px;
margin-top: 150px;
`;

const Button = styled.button`
margin: 20px;
padding: 10px;
border-radius: 10px;
border: 1px solid;
background-color: #ffbbbb;
cursor: pointer;
font-weight: bold;
transition: all 0.2s ease; 
  
  &:hover {
    transform: scale(1.1); 
    background-color: #ff9999; 
  }
`;



//component
const Authorization = ({ onLogin, onSignup }) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Container>
      <h2>{showLogin ? "Log in to Happy Thoughts" : "Sign Up"}</h2>

      {showLogin ? (
        <LoginForm onLogin={onLogin} />
      ) : (
        <SignupForm onSignup={onSignup} />
      )}
     

      <Button onClick={() => setShowLogin(!showLogin)}>
        {showLogin
          ? "Need an account? Sign up"
          : "Already have an account? Login"}
      </Button>
    </Container>
  );
};

export default Authorization;
