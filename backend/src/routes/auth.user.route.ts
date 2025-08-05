import express from "express";
const router = express.Router();
import { login, register } from "../controllers/auth.user.controller";

// login in an exist account
router.get('/login', login);

// register a new user
router.post('/register', register);


export default router;
