const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')

const jwt=require('jsonwebtoken')

const sequelize = require('./util/database')

const routes = require('./routes/userRoutes')

const Expense=require('./model/expense')
const User=require('./model/user')

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(routes)

User.hasMany(Expense)
Expense.belongsTo(User)

sequelize
    .sync()
    .then(() => { app.listen(4000) })
    .catch(err => console.log(err))

