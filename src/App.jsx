import React, { useState } from "react";
import ThoughtForm from "./components/ThoughtForm";
import ThoughtList from "./components/ThoughtList";



export const App = () => {
  const [thoughts, setThoughts] = useState([]);

  const addThought = (newMessage) => {
    const newThought = {
      id: Date.now(),
      message: newMessage,
      likes: 0,
      createdAt: Date.now()
    };
    setThoughts((prev) => [newThought, ...prev]);
  };

  const likeThought = (id) => {
    setThoughts((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, likes: t.likes + 1 } : t
      )
    );
  };


  return (
    <>
      <ThoughtForm onAddThought={addThought} />
      <ThoughtList thoughts={thoughts} onLike={likeThought} />
    </>
  );
};
