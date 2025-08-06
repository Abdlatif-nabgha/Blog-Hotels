import express from "express";
const router = express.Router();
import { login, register, logout, getAllUsers, deleteUser, updatedUserRole } from "../controllers/auth.user.controller";

// register a new user
router.post('/register', register);

// login in an exist account
router.post('/login', login);

// logout user route
router.post('/logout', logout);

// get all users route
router.get('/users', getAllUsers);

// delete a user form db
router.delete('/user/:id', deleteUser);

// update a user role
router.put('/user/:id', updatedUserRole);

export default router;
