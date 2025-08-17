import React from "react";

interface SearchBlogProps {
    search: string;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSearch: () => void;
}

const SearchBlog: React.FC<SearchBlogProps> = ({ search, handleSearchChange, handleSearch }) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="w-full flex">
            <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                onKeyUp={handleKeyPress}
                placeholder="Hotels with rooftop pool near..."
                className="w-full py-2 px-4 mr-5 bg-[#f7f8f9] focus:outline-none focus:border"
            />
            <button
                className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 cursor-pointer"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
};

export default SearchBlog;