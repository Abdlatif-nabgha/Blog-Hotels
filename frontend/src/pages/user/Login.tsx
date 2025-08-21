/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/auth/authSlice";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // handle login a user docs
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Dispatch login action
        const data = { email, password };
        try {
            const response = await loginUser(data).unwrap();
            const { token, user: loggedInUser } = response;
            // Dispatch user login action
            dispatch(setUser({user: loggedInUser, token}));
            // Save token to localStorage
            localStorage.setItem("token", token);
            // Save user to localStorage
            localStorage.setItem("user", JSON.stringify(loggedInUser));
            toast.success("Login successful!");
            navigate("/"); // Redirect to home page after successful login
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Email or password is incorrect.");
        }
    }

    return (
        <div className="max-w-sm bg-white mx-auto p-8 mt-36 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold pt-5">Please Login</h2>
            <form onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto pt-8">
                <input
                    className="w-full bg-[#F7F8F9] focus:outline-none px-5 py-3"
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="w-full bg-[#F7F8F9] focus:outline-none px-5 py-3"
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-md mt-5"
                    type="submit"
                    disabled={loginLoading}
                >
                    Login
                </button>
            </form>
            <p className="text-center mt-5">Don't have an account? <Link to="/register" className="text-indigo-500 font-medium">Register</Link> here.</p>
        </div>
    )
}

export default Login