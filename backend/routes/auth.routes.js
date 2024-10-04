import express from 'express';
import { signup } from '../controllers/authcontrollers.js';
import { login } from '../controllers/authcontrollers.js';
import { logout } from '../controllers/authcontrollers.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { getMe } from '../controllers/authcontrollers.js';
const router = express.Router();

router.get("/me", protectRoute, getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
export default router;