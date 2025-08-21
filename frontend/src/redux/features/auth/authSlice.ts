import { createSlice } from "@reduxjs/toolkit";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isTokenPresentInCookies = () => {
    const token = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
    return !!token
}

const loadUserFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem("user");
        if (serializedState === null) {
            return {user: null};
        }
        return {user: JSON.parse(serializedState)};
    } catch (error) {
        console.error("Failed to load user from local storage:", error);
        return {user: null};
    }
}

const initialState = loadUserFromLocalStorage();
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            // Save user to local storage
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        }
    }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;