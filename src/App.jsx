import React, { useState, useEffect } from "react";
import ThoughtForm from "./components/ThoughtForm";
import ThoughtList from "./components/ThoughtList";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Authorization from "./components/Authorization";
import LoggedinAs from "./components/Logout";

// API: happy thoughts 
// const API (from original project) = "https://happy-thoughts-api-4ful.onrender.com/thoughts";
const API_BASE = "https://js-project-api-7sb0.onrender.com";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);
  const [user, setUser] = useState(null);
 

  // get thoughts from API
  const fetchThoughts = () => {
     fetch(`${API_BASE}/thoughts?sort=date`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.response[0]);
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

  // signup new user
  const handleSignup = (name, email, password) => {
  fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.accessToken) {
        setAccessToken(data.accessToken);
        localStorage.setItem(
          "accessToken",
          data.accessToken
        );
        setUser({
          userId: data.id,
          name,
          email,
        });
      } else {
        console.error("Signup failed:", data.message);
      }
    })
    .catch((error) => {
      console.error("Failed to signup:", error);
    });
};

   
   // login user
  const handleLogin = (email, password) => {
  fetch(`${API_BASE}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success && data.response?.accessToken) {
        setAccessToken(data.response.accessToken);
        localStorage.setItem("accessToken", data.response.accessToken);
        setUser({ userId: data.response.userId, name: data.response.name, email: data.response.email });
      } else {
        console.error("Login failed:", data.message || "Invalid credentials");
      }
    })
    .catch((error) => {
      console.error("Failed to login:", error);
    });
};

  // logout user
  const handleLogout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  // post a new thought (with authentication)
  const addThought = (newMessage) => {
    if (!accessToken) {
      console.error("please log in to post a thoughts!");
      return;
    }
      fetch(`${API_BASE}/thoughts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": accessToken },
      body: JSON.stringify({ message: newMessage })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success){
        setThoughts((prev) => [data.response, ...prev]);
        } else {
          console.error("Failed to post thought:" + data.message)
        }
      })
       .catch((error) => {
        console.error("Failed to add thought:", error)
      });
  };

   // update a thought (with authentication)
  const updateThought = (id, newMessage) => {
    if (!accessToken) {
      console.error("Please log in to update a thought!");
      return;
    }

    fetch(`${API_BASE}/thoughts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
      },
      body: JSON.stringify({ message: newMessage })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          fetchThoughts(); // refresh list
        } else {
          console.error("Failed to update: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Failed to update thought:", error);
      });
  };

    // delete a thought (with authentication)
  const deleteThought = (id) => {
    if (!accessToken) {
      console.error("Please log in to delete a thought!");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this thought?")) {
      return;
    }

    fetch(`${API_BASE}/thoughts/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": accessToken
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          fetchThoughts(); // refresh list
        } else {
          console.error("Failed to delete: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Failed to delete thought:", error);
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

  return (
    <div>
      {!accessToken ? (
        <Authorization
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
      ) : (
        <>
          <LoggedinAs user={user} onLogout={handleLogout} />
          <ThoughtForm onAddThought={addThought} isLoggedIn />
          <ThoughtList
            thoughts={thoughts}
            onLike={likeThought}
            onUpdate={updateThought}
            onDelete={deleteThought}
            user={user}  
            isLoggedIn
          />
        </>
      )}
    </div>
  );
};
