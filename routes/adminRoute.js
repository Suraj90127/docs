
import express from 'express';
import { register, login, getAdminInfo, logout } from '../controller/adminController.js';
import adminAuth from '../middelware/adminAuth.js';



const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/info', adminAuth, getAdminInfo);
router.post("/logout", logout);


export default router;