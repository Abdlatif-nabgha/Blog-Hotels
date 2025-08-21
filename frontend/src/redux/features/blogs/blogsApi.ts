// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const blogsApi = createApi({
    reducerPath: 'blogsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/',
    }),
    tagTypes: ['Blogs'],
    endpoints: (build) => ({
        fetchBlogs: build.query({
            query: ({search='', category='', location=''}) => `/blogs?search=${search}&category=${category}&location=${location}`,
            providesTags: ['Blogs'],
        }),
        fetchBlogById: build.query({
            query: (_id: string) => `/blogs/${_id}`,
            providesTags: ['Blogs'],
        }),
        fetchRelatedBlogs: build.query({
            query: (_id: string) => `/blogs/related-blogs/${_id}`,
            providesTags: ['Blogs'],
        }),
        postBlog: build.mutation({
            query: (blogData) => ({
                url: '/blogs/create-post',
                method: 'POST',
                body: blogData,
                credentials: 'include',
            }),
        }),
        updateBlog: build.mutation({
            query: ({ _id, ...patch }) => ({
                url: `/blogs/update-blog/${_id}`,
                method: 'PUT',
                body: patch,
                credentials: 'include',
            }),
            invalidatesTags: (result, error, _id) => [{ type: 'Blogs', id: _id }],
        }),
        deleteBlog: build.mutation({
            query: (_id: string) => ({
                url: `/blogs/delete-blog/${_id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, _id) => [{ type: 'Blogs', id: _id }],
        }),
    }),
})

export const { 
    useFetchBlogsQuery, 
    useFetchBlogByIdQuery, 
    useFetchRelatedBlogsQuery, 
    usePostBlogMutation ,
    useDeleteBlogMutation,
    useUpdateBlogMutation
} = blogsApi