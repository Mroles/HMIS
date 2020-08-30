var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var morgan=require('morgan');
var passport=require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(passport.initialize());


const port=process.env.PORT||5000;

const db=require('./models');
const role=db.role;
const department=db.department;

//add {force:true} into sync to drop 



/*

db.sequelize.sync({force:true}).then(()=>{
    console.log('DROP DB');
    initial();
});
*/

app.get('/', (req,res)=>{
    res.send('home.ejs');
});

app.use(require('./controller/admin'));
app.use(require('./controller/account'));



function initial(){
    role.create({
        roleid:1,
        name:"admin"
    });

    role.create({
        roleid:2,
        name:"doctor"
    });

    role.create({
        roleid:3,
        name:"nurse"
    });

    department.create({
        id: 1,
        name: "OCD"
    });
}

app.listen(port, ()=>{
console.log('Listening on port' + port);
});