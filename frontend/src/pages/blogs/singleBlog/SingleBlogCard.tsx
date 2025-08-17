import { formatDate } from "../../../utils/formatDate";
import EditorJSHTML from "editorjs-html";

const editorJSHTML = EditorJSHTML();

interface Blog {
    title: string;
    content: string;
    coverImg: string;
    author: {
        name: string;
        email: string;
    };
    rating: number;
    createdAt: string;
}

const SingleBlogCard = ({ blog }: { blog: Blog }) => {
    const { title, content, coverImg, author, rating, createdAt } = blog || {};

    // Parse safely
    let htmlContent = "";
    try {
        const parsed = editorJSHTML.parse(content);
        if (Array.isArray(parsed)) {
            htmlContent = parsed.join(""); // If it's an array
        } else if (typeof parsed === "string") {
            htmlContent = parsed; // If it's already string
        } else if (parsed && typeof parsed === "object") {
            htmlContent = Object.values(parsed).join(""); // If it's object
        }
    } catch (err) {
        console.error("Error parsing content:", err);
    }

    return (
        <div className="bg-white p-8 rounded-lg">
            {/* Blog header */}
            <div>
                <h2 className="md:text-4xl text-3xl font-medium mb-4">{title}</h2>
                <p className="mb-6">
                    {formatDate(createdAt)} by{" "}
                    <span className="text-blue-400 cursor-pointer">
                        {author?.name || author?.email || "Admin"}
                    </span>
                </p>
            </div>

            {coverImg && (
                <div>
                    <img
                        src={coverImg}
                        alt="blog image"
                        className="w-full md:h-[520px] bg-cover"
                    />
                </div>
            )}

            <div className="mt-8 space-y-4">
                <div
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                    className="space-y-3 editorjsdiv"
                />
                {rating && (
                    <div>
                        <span className="text-lg font-medium">Rating:</span>
                        <span> {rating} (based on 2,370 reviews)</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleBlogCard;
