const User=require('../model/user')

exports.postUser=async (req,res,next)=>{
    try{
        // console.log(req.body)
        const username=req.body.name
        const email=req.body.email
        const password=req.body.password
        if(username=="" || email=="" || password==""){
            res.status(500).send('please fill all the details')
        }
        const resData=await User.create({
           username:username,
           email:email,
           password:password
        })
        res.status(201).json({newUser: resData})
    }
    catch(err){
        console.log(err)
    }
}

exports.userLogin=async (req,res,next)=>{
    try{
        const email=req.body.email
        const password=req.body.password
        if(email=="" || password==""){
            res.status(500).send('please fill all the details')
        }
        User.findOne({where: {email:email}})
         .then(user=>{
            console.log(user)
            if(user){
                if(user.dataValues.email==email && user.dataValues.password==password){
                    res.json('user logged in succesfully!')
                }
                else{
                    res.status(401).json('User not authorized')
                }
            }
            else{

                res.status(404).json('SORRY! user not found!')
            }
         })
         
    }
    catch(err){
        res.status(404).json('SORRY! user not found!')
    }
}