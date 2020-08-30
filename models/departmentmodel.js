module.exports=(sequelize,Sequelize)=>{
    const department=sequelize.define(
        "department", {
            id:{
               type: Sequelize.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            name:{
                type:Sequelize.STRING
            }
        }
    );
    return department;
};