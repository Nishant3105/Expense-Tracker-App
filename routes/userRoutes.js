const express=require('express')

const routes=express.Router()

const userController=require('../controller/userController')

const userAuthentication=require('../middleware/auth')

routes.post('/user/signup',userController.postUser)

routes.post('/user/login',userController.userLogin)

routes.post('/expense/addexpense', userAuthentication.authenticate , userController.addExpense)

routes.get('/expense/getexpense', userAuthentication.authenticate , userController.getExpense)

routes.delete('/expense/deleteexpense/:id', userAuthentication.authenticate, userController.deleteExpense)

module.exports = routes