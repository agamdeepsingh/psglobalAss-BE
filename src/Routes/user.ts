
import express from 'express'
import { getMe, login, register } from '../Controller/user'
import { protect } from '../Middlewares/auth'

const router = express.Router()
 
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/me').get(protect, getMe)


export default router

