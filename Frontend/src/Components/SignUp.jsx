import { useEffect, useState } from 'react';
import './Components.css';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [value, setValue] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setValue(prev => ({ ...prev, [name]: value }));
    setError(""); 
  }

  const collectData = async (e) => {
    e.preventDefault();
    const { name, email, password } = value;

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }

    try {
      const response = await fetch('https://e-comm-website-backend.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password }),
      });

      const contentType = response.headers.get("content-type");

      if (response.ok) {
        const data = contentType && contentType.includes("application/json")
          ? await response.json()
          : {};

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.auth);
        navigate('/');
      } else {
        if (contentType && contentType.includes("application/json")) {
          const error = await response.json();
          console.error("Signup failed:", error.error || error.message);
          setError(error.error || "Signup failed");
        } else {
          const text = await response.text();
          console.error("Signup failed (non-JSON):", text);
          setError("Signup failed: " + text);
        }
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="signup">
      <h1>Signup here</h1>
      <form className="signupForm" onSubmit={collectData} noValidate>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={value.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={value.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={value.password}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Sign Up</button>
        {error && <p className="invalid-input">{error}</p>}
      </form>
    </div>
  );
}
