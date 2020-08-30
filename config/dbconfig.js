
module.exports={
    HOST: "us-cdbr-east-02.cleardb.com",
    USER: "bd2949a7fbf65f",
    PASSWORD:"c35ff6d3",
    DB: "heroku_076d6e40870f6df", 
    DIALECT:"mysql",
    pool:{
        max:10,
        min:0,
        acquire:30000,
        idle: 1000
    }
}


/*
module.exports={
    HOST: "localhost",
    USER: "root",
    PASSWORD:"root",
    DB: "hms", 
    DIALECT:"mysql",
    pool:{
        max:10,
        min:0,
        acquire:30000,
        idle: 1000
    } 
}

*/