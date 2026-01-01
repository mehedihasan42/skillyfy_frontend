import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const res = await login({ email, password });
            console.log(res);
            // ✅ check success from backend
            if (res?.access) {
                navigate('/');   // or '/home'
            }
        } catch (error) {
            alert('Invalid email or password');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div>
                <label>Email:</label>
                <input type="email" name="email" required />
            </div>

            <div>
                <label>Password:</label>
                <input type="password" name="password" required />
            </div>

            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
