import { useState } from "react";
import styled from "styled-components";


//styling for component 

const Input = styled.input`
margin: 5px;
padding: 4px;
`;

const Button = styled.button`
background-color: #ffbbbb;
padding: 5px;
margin: 10px;
border: 1px solid;
border-radius: 10px;
font-weight: bold;
cursor: pointer;

 transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1); 
    background-color: #ff9999; 
  }
`;



//component for logging in
const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;