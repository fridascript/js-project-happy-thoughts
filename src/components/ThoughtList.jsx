import React from "react";
import styled from "styled-components";
import ThoughtCard from "./ThoughtCard";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ThoughtList = ({ thoughts, onLike, onDelete, onUpdate }) => {
  return (
    <List>
      {thoughts.map((thought) => (
        <ThoughtCard
          key={thought._id}
          thought={thought}
          onLike={onLike}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </List>
  );
};

export default ThoughtList;