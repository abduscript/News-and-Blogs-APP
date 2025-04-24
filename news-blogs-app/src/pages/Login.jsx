import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/auth.js';
import { useAuth } from '../context/AuthContext.jsx';
import './login.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser(formData);
            if (res.data) {
                login(res.data.user); // simpan user di context dan localStorage
                navigate('/home');     // 🚀 redirect ke /home
            }
        } catch (err) {
            setMessage(err.response?.data?.message || 'Login failed');
            alert('Login gagal. Cek email atau password!');
        }
    };

    return (
        <div className="container-login">
            <div className="wrapper">
                <h2>Login</h2>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
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
                    <div className="input-box">
                        <button type="submit">Login</button>
                    </div>
                    <div className="text">
                        <h3>Don't have an account? <Link to={'/signup'}>Sign Up</Link></h3>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
