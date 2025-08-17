// types/comment.ts
export interface IComment {
    _id: string;
    comment: string;
    user: {
        _id: string;
        username: string;
        email?: string;
    };
    postId: string;
    createdAt: string;
}
