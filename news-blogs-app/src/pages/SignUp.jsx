import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/auth.js';
import './signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await registerUser(formData);
        navigate('/login'); // Redirect to login page after successful signup
        } catch (err) {
        setMessage(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="container-signup">
            <div className="wrapper">
                <h2>Sign Up</h2>
                {/* {message && <p className="message">{message}</p>} */}
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input 
                        type="text" 
                        placeholder='Username'
                        name="username"
                        value={formData.username}
                        // value={username}
                        // onChange={(e) => setUsername(e.target.value)}
                        onChange={handleChange}
                        required 
                        />
                    </div>
                    <div className="input-box">
                        <input 
                        type="text" 
                        placeholder='Email'
                        name="email"
                        value={formData.email}
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        onChange={handleChange}
                        required 
                        />
                    </div>
                    <div className="input-box">
                        <input 
                        type="password" 
                        placeholder='Password'
                        name="password"
                        value={formData.password}
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        onChange={handleChange}
                        required 
                        />
                    </div>
                    <div className="policy">
                        <input type="checkbox" />
                        <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
                    </div>
                    <div className="input-box">
                        <button type="submit">Sign Up</button>
                    </div>
                    <div className="text">
                        <h3>Already have an account? <Link to={'/login'}>Login</Link></h3>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
