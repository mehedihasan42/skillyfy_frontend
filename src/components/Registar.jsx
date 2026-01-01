import React from 'react';
import { useAuth } from '../context/AuthProvider';

const Registar = () => {
    const {register} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const target = e.target;
        const username = target.username.value;
        const email = target.email.value;
        const password = target.password.value;
        const confirm_password = target.confirmPassword.value;
        const mobile_no = target.phone.value;

        const userData = {
            username,
            email,
            mobile_no,
            password,
            confirm_password
        };
        
        console.log(userData);
        await register(userData);
    }
    return (
       <form onSubmit={handleSubmit}>
        <h2>Registar</h2>
        <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
        </div><div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
        </div>
        <div>
            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
        </div><div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" />
        </div>
        <button type="submit">Register</button>
       </form>
    );
};

export default Registar;
