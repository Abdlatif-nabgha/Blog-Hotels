import { useParams } from "react-router-dom"
import { useFetchBlogByIdQuery } from "../../../redux/features/blogs/blogsApi"
import SingleBlogCard from "./SingleBlogCard"
import CommentCard from "../comments/CommentCard"
import RaletedBlogs from "./RaletedBlogs"

const SingleBlog = () => {
    const { _id } = useParams();
    const { data: blog, isLoading, error } = useFetchBlogByIdQuery(_id as string)
    return (
        <div className="container mx-auto text-primary mt-8">
            <div>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error.toString()}</p>}
                {
                    blog && (
                        <div className="flex flex-col md:flex-row justify-between items-start md:gap-14 gap-8">
                            <div className="lg:w-2/3 w-full">
                                <SingleBlogCard blog={blog.blog} />
                                <CommentCard />
                            </div>
                            <div className="bg-white p-4 lg:w-1/3 w-full">
                                <RaletedBlogs />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SingleBlog