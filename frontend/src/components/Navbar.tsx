import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoClose, IoMenuSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import commentor from "../assets/commentor.png"; // Assuming you have an image for the commentor
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

const navLists = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about-us" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Contact Us", path: "/contact-us" },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);
    console.log(user);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const dispatch = useDispatch();
    const [logoutUser] = useLogoutUserMutation();
    // handle logout
    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
        } catch (error) {
            console.error("Logout failed:", error);

        }
    }
    return (
        <header className="bg-white py-6 shadow">
            <nav className="container mx-auto flex justify-between items-center px-5">
                {/* Logo */}
                <a href="/" className="flex items-center">
                    <img src="/logo.png" alt="Logo" className="h-12" />
                </a>

                {/* Navigation Links */}
                <ul className="hidden sm:flex items-center gap-8">
                    {navLists.map((list, index) => (
                        <li key={index}>
                            <NavLink
                                to={list.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600 font-medium border-blue-600 pb-1"
                                        : "text-gray-700 hover:text-blue-600 transition"
                                }
                            >
                                {list.name}
                            </NavLink>
                        </li>
                    ))}
                    {/* render btn based on user activity  */}
                    {
                        user && user.role === 'user' ?
                            (
                                <li className="flex items-center gap-3">
                                    <img
                                        src={commentor}
                                        alt="admin"
                                        className="size-8" />
                                    <button onClick={handleLogout} className="bg-blue-600 text-white font-bold hover:bg-blue-700 px-4 py-2 rounded-sm">Logout</button>
                                </li>
                            ) :
                            (
                                <li>
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-blue-600 font-medium border-blue-600 pb-1"
                                                : "text-gray-700 hover:text-blue-600 transition"
                                        }
                                    >
                                        Login
                                    </NavLink>
                                </li>
                            )
                    }

                    {
                        user && user.role === 'admin' && (
                            <li className="flex items-center gap-3">
                                <img
                                    src={commentor}
                                    alt="admin"
                                    className="size-8" />
                                <Link to="/dashboard">
                                    <button className="bg-blue-600 text-white font-bold hover:bg-blue-700 px-4 py-2 rounded-sm">
                                        Dashboard
                                    </button>
                                </Link>
                            </li>
                        )
                    }
                </ul>
                <div className="flex items-center sm:hidden">
                    <button
                        onClick={toggleMenu}
                        className="flex items-center px-3 py-4 bg-[#fafafa] rounded text-sm text-gray-500 hover:text-gray-900"
                    >
                        {isMenuOpen ? <IoClose className="h-6 w-6" /> : <IoMenuSharp className="h-6 w-6" />}
                    </button>
                </div>
            </nav>
            {/* mobile menu items  */}
            {
                isMenuOpen && (
                    <ul className="fixed top-[108px] left-0 w-full h-auto bg-white shadow-sm border-b pb-8 z-50">
                        {navLists.map((list, index) => (
                            <li key={index} className="mt-5 px-4">
                                <NavLink
                                    to={list.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-blue-600 font-medium border-blue-600 pb-1"
                                            : "text-gray-700 hover:text-blue-600 transition"
                                    }
                                >
                                    {list.name}
                                </NavLink>
                            </li>
                        ))}
                        <li className="mt-5 px-4">
                            <NavLink
                                to="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600 font-medium border-blue-600 pb-1"
                                        : "text-gray-700 hover:text-blue-600 transition"
                                }
                            >
                                Login
                            </NavLink>
                        </li>
                    </ul>
                )
            }
        </header>
    );
};

export default Navbar;
