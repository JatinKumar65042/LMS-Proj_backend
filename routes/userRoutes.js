import {Router} from "express"
import { forgotPassword, getProfile, login, logout, register, resetPassword } from "../controllers/usercontroller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router=Router();

router.post('/register',upload.single("avatar"), register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me',isLoggedIn, getProfile);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password', resetPassword);

export default router;