import { useState } from "react";
import SearchBlog from "./SearchBlog"
import { useFetchBlogsQuery } from "../../redux/features/blogs/blogsApi";
import { Link } from "react-router-dom";
import Loading from "./Loading";

interface Blog {
    title: string;
    description: string;
    content: string;
    coverImg: string;
    category: string;
    author: string;
    rating: number;
    createdAt: string;
    _id: string;
}

const Blogs = () => {
    const [search, setSearch] = useState('');
    const [category,] = useState('');
    const [query, setQuery] = useState({ search: '', category: '' });

    // get data using redux
    const { data: blogs = [], isLoading, error } = useFetchBlogsQuery(query)
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        // if input is cleared, reset query to fetch all blogs
        if (value === '') {
            setQuery({ search: '', category: '' });
        }
    };


    const handleSearch = () => {
        setQuery({ search, category });
    }

    return (
        <div className="mt-16 container mx-auto">
            <SearchBlog
                search={search}
                handleSearchChange={handleSearchChange}
                handleSearch={handleSearch}
            />
            <div className="m-4">
                {isLoading && <Loading />}
            </div>

            {error && <p>Error: {error.toString()}</p>}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {
                    blogs.map((blog: Blog) => (
                        <Link
                            to={`/blogs/${blog._id}`}
                            key={blog._id}
                            className="shadow-md p-4 rounded-lg"
                        >
                            <img
                                src={blog.coverImg}
                                alt="blog image"
                                className="h-80 w-full "
                            />
                            <h2 className="mt-4 text-xl font-semibold">{blog.title}</h2>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Blogs