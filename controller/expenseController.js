const Expense=require('../model/expense')

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