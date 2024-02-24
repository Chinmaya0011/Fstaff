import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';
import { MyContext } from '../Context/MyContext';

function Login() {
    const { isLogin, setIsLogin } = useContext(MyContext);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formData;
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Successfully logged in
                const user = userCredential.user;
                console.log('Logged in user:', user);
                setIsLogin(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Login error:', errorCode, errorMessage);
            });
    };

    return (
        <div className="login-container">
            <h2 className="login-heading">Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email" className="login-label">
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="login-input"
                />
                <label htmlFor="password" className="login-label">
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="login-input"
                />
                <button type="submit" className="login-button">
                    Login
                </button>
            </form>
            <div className="signup-link-container">
                <span className="signup-link-text">Don't have an account? </span>
                <Link to="/signup" className="signup-link">Sign up here</Link>
            </div>
        </div>
    );
}

export default Login;
