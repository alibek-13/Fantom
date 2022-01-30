import { Router } from "express";
import authcontroller from '../controller/auth.controller.js'

const router = Router()

router.post('/registration', authcontroller.registration)
router.post('/login', authcontroller.login)
router.post('/logout', authcontroller.logout)

export default router