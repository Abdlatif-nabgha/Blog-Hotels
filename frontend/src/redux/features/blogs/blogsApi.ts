// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const blogsApi = createApi({
    reducerPath: 'blogsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/',
    }),
    endpoints: (build) => ({
        fetchBlogs: build.query({
            query: ({search='', category='', location=''}) => `/blogs?search=${search}&category=${category}&location=${location}`,
        }),
        fetchBlogById: build.query({
            query: (_id: string) => `/blogs/${_id}`,
        }),
        fetchRelatedBlogs: build.query({
            query: (_id: string) => `/blogs/related-blogs/${_id}`,
        })
    }),
})

export const { useFetchBlogsQuery, useFetchBlogByIdQuery, useFetchRelatedBlogsQuery } = blogsApi
