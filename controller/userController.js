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