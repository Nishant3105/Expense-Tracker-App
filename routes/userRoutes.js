const express=require('express')

const routes=express.Router()

const userController=require('../controller/userController')

const userAuthentication=require('../middleware/auth')

routes.post('/user/signup',userController.postUser)

routes.post('/user/login',userController.userLogin)

routes.get('/user/download', userAuthentication.authenticate, userController.)


module.exports = routes