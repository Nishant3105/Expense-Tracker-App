const User = require('../model/user')

const Expense=require('../model/expense')

const bcrypt = require('bcrypt')

const jwt=require('jsonwebtoken')

function generateAccessToken(id){
    return jwt.sign({userId:id},'secretkey')
}

exports.postUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        if (name == "" || email == "" || password == "") {
            res.status(500).send('please fill all the details')
        }
        bcrypt.hash(password, 10, async (err, hash) => {
            await User.create({
                username: name,
                email,
                password: hash
            })

            res.status(201).json({ message: 'Successfully created new user' })
        })
    }
    catch (err) {
        console.log(err)
    }
}

exports.userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        console.log(email, password)
        if (email == "" || password == "") {
            res.status(400).json({ message: 'please fill all the details', success: false })
        }
        const user = await User.findAll({ where: { email } })
        console.log(user)
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, response) => {
                if (err) {
                    throw new Error('Something went wrong!')
                }
                if (response === true) {
                    res.status(200).json({ success: true, message: "User logged in successfully",token: generateAccessToken(user[0].id) })
                }
                else {
                    res.status(400).json({ success: true, message: "Password is incorrect" })
                }
            })
        } else {
            res.status(404).json({ success: true, message: "User doesn't exist" })
        }

    }
    catch (err) {
        res.status(404).json('SORRY! user not found!')
    }
}

exports.addExpense=async (req,res,next)=>{
    try{
      const {expenseprice,description,typeofexpense}=req.body
      if(expenseprice=="" || description=="" || typeofexpense==""){
        res.status(400).json({message: 'Please fill all the details'})
      }
      console.log(req.user)
      const expdata=await Expense.create({
        expenseprice,
        description,
        typeofexpense,
        userId:req.user.id
      })
      res.status(200).json(expdata)

    }
    catch(err){
        console.log(err)
        res.status(500).json({success: false})
    }
}

exports.getExpense=(req,res,next)=>{
    try{
        //req.user.getExpense().then.....
        console.log(req.user.id)
        Expense.findAll({where: {userId: req.user.id}})
        .then(expenses=>{
            console.log(expenses)
            res.status(200).json(expenses)
        })
    }
    catch(err){
        res.status(404).json({message: 'No response to display'})
    }
}

exports.deleteExpense=(req,res,next)=>{
    try{
        const id=req.params.id
        Expense.destroy({where:{id}})
        .then(result=>{
            res.json({message: 'expense deleted successfully!'})
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: 'Something went wrong'})
    }
}