import commentor from "../../../assets/commentor.png"
import { formatDate } from "../../../utils/formatDate"
import PostComment from "./PostComment"
import type { IComment } from "../../../types/comment"

const CommentCard = ({ comments }: { comments: IComment[] }) => {
    return (
        <div className="my-6 bg-white p-8">
            <div>
                {comments?.length > 0 ? (
                    <div>
                        <h3 className="text-lg font-medium">All Comments</h3>
                        <div>
                            {comments.map((comment) => (
                                <div key={comment._id} className="mb-6">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={commentor}
                                            alt="commentor"
                                            className="h-14 w-14 rounded-full"
                                        />
                                        <div>
                                            <p className="text-lg font-medium underline underline-offset-4 capitalize text-blue-400">
                                                {comment.user?.username}
                                            </p>
                                            <p className="text-[12px] italic">
                                                {formatDate(comment.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    {/* comment details */}
                                    <div className="text-gray-600 mt-5 border p-4 rounded-md">
                                        <p className="md:w-4/5">{comment.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-lg font-medium">No comments yet</p>
                )}
            </div>
            {/* comments input here */}
            <PostComment />
        </div>
    )
}

export default CommentCard
