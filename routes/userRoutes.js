const express=require('express')

const routes=express.Router()

const userController=require('../controller/userController')

routes.post('/user/signup',userController.postUser)

routes.post('/user/login',userController.userLogin)

module.exports = routes