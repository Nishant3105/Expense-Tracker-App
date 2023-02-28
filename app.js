const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')

const jwt=require('jsonwebtoken')


const sequelize = require('./util/database')

const userroutes = require('./routes/userRoutes')
const exproutes = require('./routes/expenseRoutes')
const purchaseroutes = require('./routes/purchaseRoutes')
const premiumroutes = require('./routes/premiumRoutes')
const fproutes = require('./routes/forgotpassword')

const Expense=require('./model/expense')
const User=require('./model/user')
const Order=require('./model/order')
const Forgotpassword=require('./model/forgotpassword')

const app = express()
const dotenv = require("dotenv")

dotenv.config();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(userroutes)

app.use(exproutes)

app.use(purchaseroutes)

app.use(premiumroutes)

app.use(fproutes)

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

sequelize
    .sync()
    .then(() => { app.listen(4000) })
    .catch(err => console.log(err))

