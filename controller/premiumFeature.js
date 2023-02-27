const Expense=require('../model/expense')

const User=require('../model/user')


exports.getUserLeaderBoard=async (req,res,next)=>{
    try{
        const users=await User.findAll()
        const expenses=await Expense.findAll()
        const userAggregatedExpense={}
        expenses.forEach((expense)=>{
           if(userAggregatedExpense[expense.userId]){
            userAggregatedExpense[expense.userId]=userAggregatedExpense[expense.userId] + expense.expenseprice
           }
           else{
            userAggregatedExpense[expense.userId]=expense.expenseprice
           }
        })
        const userLeaderBoardArray=[]
        users.forEach((user)=>{
            userLeaderBoardArray.push({name: user.username, total_cost: userAggregatedExpense[user.id]})
        })
        const leaderBoardDetails=userLeaderBoardArray.sort((a,b)=>b.total_cost-a.total_cost)
        res.status(200).json(leaderBoardDetails)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
        
    }