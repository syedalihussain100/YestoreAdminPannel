import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUserAction } from "../../store/AuthSlice/Auth";
import "./Login.css";
import Loading from "./Loading"; // Import your Loading component

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate(); // Use navigate to redirect
    const dispatch = useDispatch();

    const validateField = (name, value) => {
        let error = '';
        if (name === 'email' && !value) {
            error = 'Email is required';
        }
        if (name === 'password' && !value) {
            error = 'Password is required';
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const { appErr, serverErr, loading } = useSelector((state) => state?.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        let formErrors = { email: '', password: '' };

        if (!email) {
            formErrors.email = 'Email is required';
            emailRef.current.focus();
        }

        if (!password) {
            formErrors.password = 'Password is required';
            passwordRef.current.focus();
        }

        setErrors(formErrors);

        if (!formErrors.email && !formErrors.password) {
            dispatch(loginUserAction({ email: email, password: password }));
            navigate('/');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
        validateField(name, value);
    };

    return (
        <div className="min-h-screen flex w-full items-center justify-center bg-gray-900 relative z-10">
            {loading ? (
                // Display loading spinner at the center
                <div className="flex items-center justify-center h-screen">
                    <Loading />
                </div>
            ) : (
                // Show login form when not loading
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm z-20">
                    <h1 className="text-3xl font-bold text-white text-center mb-6">Admin Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                ref={emailRef}
                                type="email"
                                className={`w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email && 'border-red-500'}`}
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                ref={passwordRef}
                                type="password"
                                className={`w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password && 'border-red-500'}`}
                                placeholder="Enter your password"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password}</p>}
                        </div>

                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Login
                        </button>
                    </form>
                    <div className='text-center text-red-500 mt-3'>
                        {appErr || serverErr && <p>{appErr}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
