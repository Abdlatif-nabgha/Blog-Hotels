import { configureStore } from '@reduxjs/toolkit'
import { blogsApi } from './features/blogs/blogsApi'
import authApi from './features/auth/authApi'
import authReducer from './features/auth/authSlice'
import commentApi from './features/comments/commentApi'

export const store = configureStore({
    reducer: {
        [blogsApi.reducerPath]: blogsApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(blogsApi.middleware, authApi.middleware, commentApi.middleware),
})

// Export types for TypeScript (if using TypeScript)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch