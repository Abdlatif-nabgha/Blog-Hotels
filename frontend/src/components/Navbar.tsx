import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenuSharp } from "react-icons/io5";

const navLists = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about-us" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Contact Us", path: "/contact-us" },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
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
