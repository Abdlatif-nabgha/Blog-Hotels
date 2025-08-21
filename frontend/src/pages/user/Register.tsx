import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, ] = useState('')
    const [username, setUsername] = useState('')
    return (
        <div className="max-w-sm bg-white mx-auto p-8 mt-36 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold pt-5">Please Register</h2>
            <form className="space-y-5 max-w-sm mx-auto pt-8">
                <input
                    className="w-full bg-[#F7F8F9] focus:outline-none px-5 py-3"
                    type="text"
                    placeholder="Username"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
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
                {
                    message && <p className="text-red-500">{message}</p>
                }
                <button
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-md mt-5"
                    type="submit"
                >
                    Register
                </button>
            </form>
            <p className="text-center mt-5">Already have an account? <Link to="/login" className="text-indigo-500 font-medium">Login</Link> here.</p>
        </div>
    )
}

export default Register