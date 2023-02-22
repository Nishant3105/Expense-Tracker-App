const express=require('express')

const routes=express.Router()

const userController=require('../controller/userController')

routes.post('/user/signup',userController.postUser)

module.exports = routes