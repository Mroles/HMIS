module.exports=(sequelize,Sequelize)=>{
    const role=sequelize.define(
        "roles", {
            roleid:{
               type: Sequelize.INTEGER,
                primaryKey:true
            },
            name:{
                type:Sequelize.STRING
            }
        }
    );
    return role;
};