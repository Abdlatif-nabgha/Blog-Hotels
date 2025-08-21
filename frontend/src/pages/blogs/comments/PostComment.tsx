import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostCommentMutation } from "../../../redux/features/comments/commentApi";
import { useFetchBlogByIdQuery } from "../../../redux/features/blogs/blogsApi";

const PostComment: React.FC = () => {
    const { _id } = useParams<{ _id?: string }>();
    const [comment, setComment] = useState<string>("");

    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = useSelector((state: any) => state.auth?.user); // ✅ fixed

    const [postComment, { isLoading }] = usePostCommentMutation();
    const { refetch } = useFetchBlogByIdQuery(_id as string, { skip: !_id });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please login to post a comment");
            navigate("/login");
            return;
        }

        const newComment = {
            comment: comment.trim(),
            user: user._id, // ✅ fixed
            postId: _id,
        };
        console.log("newComment payload:", newComment);

        try {
            const response = await postComment(newComment).unwrap();
            console.log("Comment posted successfully:", response);
            toast.success("Comment posted successfully");
            setComment("");
            refetch(); // refresh comments list
        } catch (error) {
            console.error("Failed to post comment:", error);
            toast.error("Failed to post comment");
        }
    };

    return (
        <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Leave a comment</h3>

            {!user && (
                <p className="text-sm text-gray-600 mb-4">
                    Please{" "}
                    <a href="/login" className="text-indigo-600">
                        login
                    </a>{" "}
                    to leave a comment.
                </p>
            )}

            <form onSubmit={handleSubmit}>
                <textarea
                    name="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    cols={30}
                    rows={6}
                    placeholder="Share your opinion about this post"
                    className="w-full bg-[#F7F8F9] focus:outline-none p-4 rounded-md border border-gray-200"
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full mt-4 ${isLoading ? "bg-gray-400" : "bg-[#222222] hover:bg-indigo-500"
                        } text-white font-medium py-3 rounded-md`}
                >
                    {isLoading ? "Posting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default PostComment;
