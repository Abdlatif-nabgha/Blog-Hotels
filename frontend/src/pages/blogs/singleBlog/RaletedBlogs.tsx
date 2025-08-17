import { useParams } from "react-router-dom"
import { useFetchRelatedBlogsQuery } from "../../../redux/features/blogs/blogsApi"
import { Link } from "react-router-dom";
import type { IBlog } from "../../../types/blog"

const RaletedBlogs = () => {
    const { _id } = useParams();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: blogs = [], isLoading, error } = useFetchRelatedBlogsQuery(_id as string)
    return (
        <div>
            <h2 className="text-2xl font-medium mt-8 px-8 pb-5">Related Blogs</h2>
            <hr />
            {
                blogs?.length > 0
                    ? (
                        <div className="space-y-4 mt-5">
                            {
                                blogs.map((blog: IBlog) => (
                                    <Link
                                        to={`/blogs/${blog._id}`}
                                        key={blog._id}
                                        className="flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm px-8 py-4"
                                    >
                                        <div className="size-14">
                                            <img
                                                src={blog.coverImg}
                                                alt="blog image"
                                                className="w-full h-full rounded-full ring-2 ring-blue-700"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-[#1e73be] font-medium">{blog.title.substring(0, 50)}</h3>
                                            <p>{blog.description.substring(0, 50)}...</p>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    )
                    : (<div className="p-8">No related blogs found</div>)
            }
        </div>
    )
}

export default RaletedBlogs