import React, { useState, useEffect } from "react";
import ThoughtForm from "./components/ThoughtForm";
import ThoughtList from "./components/ThoughtList";

// API: happy thoughts 
const API = "https://happy-thoughts-api-4ful.onrender.com/thoughts";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);

  // get thoughts from API
  const fetchThoughts = () => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        setThoughts(data);
      });
  };

  // get thoughts when opening the site 
  useEffect(() => {
    fetchThoughts();
  }, []);

  // post a new thought
  const addThought = (newMessage) => {
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: newMessage })
    })
      .then((response) => response.json())
      .then((newThoughtFromAPI) => {
        setThoughts((prev) => [newThoughtFromAPI, ...prev]);
      });
  };

  // like a post 
  const likeThought = (id) => {
    fetch(`${API}/${id}/like`, {
      method: "POST"
    })
      .then(() => {
        fetchThoughts();
      });
  };

  // for it to show in the browser! 
  return (
    <>
      <ThoughtForm onAddThought={addThought} />
      <ThoughtList thoughts={thoughts} onLike={likeThought} />
    </>
  );
};
