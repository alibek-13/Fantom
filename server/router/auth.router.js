import { Router } from "express";
import authcontroller from '../controller/auth.controller.js'
import authMiddlewaree from "../middlewaree/auth.middlewaree.js";

const router = Router()

router.post('/registration', authcontroller.registration)
router.post('/login', authcontroller.login)
router.post('/logout', authcontroller.logout)
router.get('/refresh', authcontroller.refresh)
router.get('/users', authMiddlewaree, authcontroller.getUser)

export default router