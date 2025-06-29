import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import './Nav.css';
import { name } from "ejs";
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    async function handleLogin(e) {
        e.preventDefault();

        let result = await fetch('http://localhost:3000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        result = await result.json();
        if (result.auth && result.user) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", result.auth);
            navigate('/');
        } else {
            alert("Invalid credentials. Please try again.");
        }

    }

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    }, [])
    return (
        <div className="Login">
            <h1>Login here</h1>
            <form className="LoginForm" >
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}

                />
                <br />
                <button onClick={handleLogin} type="submit">Login</button>
            </form>
        </div>
    )
}