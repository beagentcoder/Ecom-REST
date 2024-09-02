import express from 'express'
import UserController from './user.controller.js'

const userRouter=express.Router()
const userContoller=new UserController



userRouter.post('/signin',userContoller.login)
userRouter.post('/signup',userContoller.register)

export default userRouter