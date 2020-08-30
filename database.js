var config=require('./config/dbconfig');
var Sequelize=require('sequelize');

module.exports=new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    config.db.details
);