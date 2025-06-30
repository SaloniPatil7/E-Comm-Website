import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Components.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        //  Client-side validation
        if (!email.trim() || !password.trim()) {
            setError("Please fill in both fields.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (response.ok && result.auth && result.user) {
                localStorage.setItem("user", JSON.stringify(result.user));
                localStorage.setItem("token", result.auth);
                navigate('/');
            } else {
                setError("Invalid credentials. Please try again.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Something went wrong. Please try again.");
        }
    }


    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="Login">
            <h1>Login here</h1>

            <form className="LoginForm" onSubmit={handleLogin}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Login</button>


                {error && <p className="invalid-input">{error}</p>}
            </form>
        </div>
    );
}
