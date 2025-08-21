import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define types for your API
interface User {
    _id: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
    createdAt: string;
    updatedAt: string;
}

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface AuthResponse {
    user: User;
    token: string;
    message: string;
}

interface UpdateRoleRequest {
    _id: string;
    role: 'user' | 'admin';
}

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/auth',
        credentials: 'include',
        prepareHeaders: (headers) => {
            // Get token from localStorage or your auth state
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        registerUser: builder.mutation<AuthResponse, RegisterRequest>({
            query: (user) => ({
                url: '/register',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        loginUser: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials
            }),
            invalidatesTags: ['User']
        }),
        logoutUser: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            invalidatesTags: ['User']
        }),
        getUsers: builder.query<User[], void>({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
            providesTags: ['User']
        }),
        deleteUser: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User']
        }),
        updateUserRole: builder.mutation<{ message: string; user: User }, UpdateRoleRequest>({
            query: ({ _id, role }) => ({
                url: `/user/${_id}`,
                method: 'PUT',
                body: { role }
            }),
            invalidatesTags: ['User']
        }),
    }) 
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useUpdateUserRoleMutation
} = authApi;

export default authApi;