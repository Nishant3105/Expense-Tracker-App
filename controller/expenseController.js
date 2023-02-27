const Expense = require('../model/expense')
const User = require('../model/user')
const sequelize = require('../util/database')

exports.addExpense = async (req, res, next) => {
    try {
        const t = await sequelize.transaction()
        const { expenseprice, description, typeofexpense } = req.body
        if (expenseprice == "" || description == "" || typeofexpense == "") {
            res.status(400).json({ message: 'Please fill all the details' })
        }
        console.log(req.user)
        const expdata = await Expense.create({
            expenseprice,
            description,
            typeofexpense,
            userId: req.user.id
        },
            { transaction: t })
        const totalExpense = Number(req.user.totalexpense) + Number(expenseprice)
        await User.update({
            totalexpense: totalExpense
        }, {
            where: { id: req.user.id }
        }, { transaction: t })
        await t.commit()
        res.status(200).json(expdata)

    }
    catch (err) {
        console.log(err)
        await t.rollback()
        res.status(500).json({ success: false })
    }

}


exports.getExpense = (req, res, next) => {
    try {
        //req.user.getExpense().then.....
        console.log(req.user.id)
        Expense.findAll({ where: { userId: req.user.id } })
            .then(expenses => {
                res.status(200).json(expenses)
            })
    }
    catch (err) {
        res.status(404).json({ message: 'No response to display' })
    }
}

exports.deleteExpense = async (req, res, next) => {
    try {
        const t = await sequelize.transaction()
        const id = req.params.id
        const expense = await Expense.findAll({ where: { id } }, { transaction: t })
        const expamt = expense[0].expenseprice
        console.log(expamt)
        const response = await Expense.destroy({ where: { id } }, { transaction: t })
        if (response == true) {
            const totalExpense = Number(req.user.totalexpense) - Number(expamt)
            await User.update({
                totalexpense: totalExpense
            }, {
                where: { id: req.user.id }
            },
                { transaction: t })
            await t.commit()
            res.json({ message: 'expense deleted successfully!' })
        }
    }
    catch (err) {
        console.log(err)
        await t.rollback()
        res.status(500).json({ message: 'Something went wrong' })
    }
}