import express from "express";
const router = express.Router();
import { login, register } from "../controllers/auth.user.controller";

// register a new user
router.post('/register', register);

// login in an exist account
router.post('/login', login);


export default router;
