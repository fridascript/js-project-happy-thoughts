import React, { useState, useEffect } from "react";
import ThoughtForm from "./components/ThoughtForm";
import ThoughtList from "./components/ThoughtList";

// API: happy thoughts 
// const API (from original project) = "https://happy-thoughts-api-4ful.onrender.com/thoughts";
const API_BASE = "https://js-project-api-7sb0.onrender.com";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);

  // get thoughts from API
  const fetchThoughts = () => {
     fetch(`${API_BASE}/thoughts?sort=date`)
      .then((response) => response.json())
      .then((data) => {
        setThoughts(data.response);
      })
      .catch((error) => {
        console.error("Failed to fetch thoughts:", error)
      });
  };

  // get thoughts when opening the site 
  useEffect(() => {
    fetchThoughts();
  }, []);

  // post a new thought
  const addThought = (newMessage) => {
      fetch(`${API_BASE}/thoughts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: newMessage })
    })
      .then((response) => response.json())
      .then((data) => {
        setThoughts((prev) => [data.response, ...prev]);
      })
       .catch((error) => {
        console.error("Failed to add thought:", error)
      });
  };

  // like a post 
  const likeThought = (id) => {
    fetch(`${API_BASE}/thoughts/${id}/like`, {
      method: "PATCH"
    })
      .then(() => {
        fetchThoughts();
      })
       .catch((error) => {
        console.error("Failed to like thoughts:", error)
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
