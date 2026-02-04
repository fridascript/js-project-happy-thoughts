import styled from "styled-components";

// styling for component 

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffe6e6;
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
`;

const WelcomeText = styled.p`
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const LogoutButton = styled.button`
  background-color: #ffbbbb;
  border: none;
  border-radius: 10px;
  padding: 10px 15px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
    background-color: #ff9999;
  }
`;

// component 
const LoggedinAs = ({ user, onLogout }) => {
  return (
    <Container>
      <WelcomeText>Logged in as, {user?.name || "User"}!</WelcomeText>
      <LogoutButton onClick={onLogout}>Logout</LogoutButton>
    </Container>
  );
};

export default LoggedinAs;