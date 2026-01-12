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
     <div className='hero bg-base-200 min-h-screen'>
        <form
  className="card w-full max-w-sm bg-base-100 shadow-xl p-6 space-y-4"
  onSubmit={handleSubmit}
>
  <h2 className="text-2xl font-bold text-center">Register</h2>

  <div className="form-control">
    <label className="label">
      <span className="label-text">Username</span>
    </label>
    <input
      type="text"
      name="username"
      placeholder="Enter your username"
      className="input input-bordered w-full"
      required
    />
  </div>

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
      <span className="label-text">Phone</span>
    </label>
    <input
      type="tel"
      name="phone"
      placeholder="Enter your phone number"
      className="input input-bordered w-full"
    />
  </div>

  <div className="form-control">
    <label className="label">
      <span className="label-text">Password</span>
    </label>
    <input
      type="password"
      name="password"
      placeholder="Create a password"
      className="input input-bordered w-full"
      required
    />
  </div>

  <div className="form-control">
    <label className="label">
      <span className="label-text">Confirm Password</span>
    </label>
    <input
      type="password"
      name="confirmPassword"
      placeholder="Confirm your password"
      className="input input-bordered w-full"
      required
    />
  </div>

  <button className="btn btn-primary w-full">
    Register
  </button>

  <p className="text-center text-sm">
    Already have an account?{" "}
    <a href="/login" className="link link-primary">
      Login
    </a>
  </p>
</form>

     </div>
    );
};

export default Registar;
