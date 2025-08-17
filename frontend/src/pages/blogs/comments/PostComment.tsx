import { useState } from "react";
import { useParams } from "react-router-dom"


const PostComment = () => {
    const {id} = useParams();
    console.log(id)
    const [comment, setComment] = useState('')
    // todo: handle posting functionality later inxallah
    return (
        <div className="mt-8">
            <h3 className="text-lg font-medium mb-8">Leave a comment</h3>
            <form>
                <textarea 
                    name="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    cols={30}
                    rows={10}
                    placeholder="Share your opinion about this post"
                    className="w-full bg-[#F7F8F9] focus:outline-none p-5"
                />
                <button
                    type="submit"
                    className="w-full bg-[#222222] hover:bg-indigo-500 text-white font-medium py-3 rounded-md"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default PostComment