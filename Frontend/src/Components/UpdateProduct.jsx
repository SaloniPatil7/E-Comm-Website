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


        if (!name || !email || !password) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.auth);
                navigate('/');
            } else {
                const errorText = await response.text();
                setError(errorText || "Signup failed. Try again.");
            }
        } catch (err) {
            console.error("Signup error:", err);
            setError("Something went wrong. Please try again.");
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
            <form className="signupForm" onSubmit={collectData}>
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
