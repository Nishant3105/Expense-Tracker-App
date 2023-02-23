const express=require('express')

const routes=express.Router()

const userController=require('../controller/userController')

routes.post('/user/signup',userController.postUser)

routes.post('/user/login',userController.userLogin)

routes.post('/expense/addexpense',userController.addExpense)

routes.get('/expense/getexpense',userController.getExpense)

routes.delete('/expense/deleteexpense/:id',userController.deleteExpense)

module.exports = routes