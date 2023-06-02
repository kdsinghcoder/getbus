import express from "express";
import { registerUser, signinUser, isLogedIn, logout } from '../controllers/auth.js'
import Authenticate from '../middleware/authenticate.js'
const router = express.Router();

router.post('/register', registerUser);
router.post('/signin', signinUser);
router.get('/isLogedIn', Authenticate, isLogedIn)
router.get('/logout', logout)


export default router;