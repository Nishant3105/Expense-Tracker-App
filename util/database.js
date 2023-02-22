const Sequelize=require('sequelize')

const sequelize=new Sequelize('expense','root','Ke$31hav15',{
    dialect:'mysql',
    host:'localhost'
})

module.exports= sequelize



