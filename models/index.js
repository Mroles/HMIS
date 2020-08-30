const dbConfig=require('../config/dbconfig');
const Sequelize=require('sequelize');

const sequelize=new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host:dbConfig.HOST,
        dialect:dbConfig.DIALECT,
        //operatorsAliases:false,

        pool:{
            max:dbConfig.pool.max,
            min:dbConfig.pool.min,
            acquire:dbConfig.pool.acquire,
            idle:dbConfig.pool.idle
            }
    }
);

const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.user=require('./usermodel')(sequelize,Sequelize);
db.role=require('./rolemodel')(sequelize,Sequelize);
db.department=require('./departmentmodel')(sequelize, Sequelize);

//One User to many Roles
//One Role to Many Users
db.role.belongsToMany(db.user, {
    through:"user_roles",
    foreignKey:'roleid',
    otherKey:'userid'
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userid",
    otherKey: "roleid"
  });

//One User to One Department
//One Department to Many Users

db.department.hasMany(db.user);
db.user.belongsTo(db.department);


db.ROLES=["admin", "doctor", "nurse"];

module.exports=db;