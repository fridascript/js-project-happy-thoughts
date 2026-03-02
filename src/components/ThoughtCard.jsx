import React, { useState } from "react";
import styled from "styled-components";
import { formatTimestamp } from "../Data/timestampData";

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

  @media (min-width: 768px) { width: 100%; }
  @media (min-width: 1024px) { width: 100%; }
  @media (min-width: 1400px) { width: 100%; }
`;

const Message = styled.p`
  margin: 0;
  font-size: 18px;
  padding: 20px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;

  @media (min-width: 768px) { font-size: 20px; }
`;

const EditInput = styled.textarea`
  margin: 0;
  font-size: 18px;
  padding: 20px;
  width: 100%;
  border: 1px solid #ccc;
  resize: none;
  font-family: inherit;
  box-sizing: border-box;

  @media (min-width: 768px) { font-size: 20px; }
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
  &:hover { transform: scale(1.1); }

  @media (min-width: 768px) { width: 35px; height: 35px; }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px 6px;
  &:hover { opacity: 0.7; }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin: 0;
  padding: 0 20px;
`;

const ThoughtCard = ({ thought, onLike, onDelete, onUpdate, user }) => {
  const isOwner = user && thought.user === user.userId;
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(thought.message);
  const [error, setError] = useState(null);

  const handleLike = () => onLike(thought._id);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`https://js-project-api-7sb0.onrender.com/thoughts/${thought._id}`, {
        method: "DELETE",
        headers: { Authorization: token }
      });
      if (!res.ok) throw new Error("Could not delete thought.");
      onDelete(thought._id);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`https://js-project-api-7sb0.onrender.com/thoughts/${thought._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ message: editedMessage })
      });
      if (!res.ok) throw new Error("Could not update thought.");
      const updated = await res.json();
      onUpdate(updated);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <PageWrapper>
      <Card>
        {isEditing ? (
          <>
            <EditInput
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleUpdate();
                }
              }}
              rows={3}
            />
            <CardFooter>
              <ActionButton onClick={handleUpdate}>✅ Save</ActionButton>
            </CardFooter>
          </>
        ) : (
          <Message>{thought.message}</Message>
        )}

        {error && <ErrorText>{error}</ErrorText>}

        <CardFooter>
          <div style={{ display: "flex", alignItems: "center" }}>
            <LikeButton onClick={handleLike} $liked={thought.hearts > 0}>❤️</LikeButton>
            <span>x {thought.hearts}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {isOwner && (
              <>
                <ActionButton onClick={() => setIsEditing(true)} title="Edit">✏️</ActionButton>
                <ActionButton onClick={handleDelete} title="Delete">🗑️</ActionButton>
              </>
            )}
            <span>{formatTimestamp(thought.createdAt)}</span>
          </div>
        </CardFooter>
      </Card>
    </PageWrapper>
  );
};

export default ThoughtCard;