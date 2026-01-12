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
       <div className='hero bg-base-200 min-h-screen'>
         <form
            className="card w-full max-w-sm bg-base-100 shadow-xl p-6 space-y-4"
            onSubmit={handleSubmit}
        >
            <h2 className="text-2xl font-bold text-center">Login</h2>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                    required
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="input input-bordered w-full"
                    required
                />
            </div>

            <button className="btn btn-primary w-full">
                Login
            </button>
              <p className="text-center text-sm">
     New user?Create account?{" "}
    <a href="/registar" className="link link-primary">
      Register
    </a>
  </p>
        </form>
       </div>

    );
};

export default Login;
