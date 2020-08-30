var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
const db = require('../models');
const Role = db.role;
const User = db.user;
const Department = db.department;

var {
    verifySignUp
} = require('../middleware');
const Op = db.Sequelize.Op;
var {
    authJwt
} = require('../middleware');


router.get('/staff', [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {
    User.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send(
            err.message || "An error occured"
        )
    })

});

router.post('/staff/add', [authJwt.verifyToken,authJwt.isAdmin,verifySignUp.checkUsernameOrEmail,verifySignUp.checkStaffId], (req, res) => {

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        fullname: req.body.fullname,
        departmentId:req.body.departmentid,
        staffid:req.body.staffid,
    }).then((user) => {
        if(req.body.roles){
            Role.findAll({
                where:{
                    name:{
                        [Op.or]:req.body.roles
                    }
                }
            }).then(roles=>{
                user.setRoles(roles).then(()=>{
                    res.send({
                        message: "User Registered Successfully"
                    });
                })
            })
        }else{
            user.setRoles([3]).then(()=>{
                res.send({ message: "User was registered successfully!" });
            })
        }     
        
    }).catch(err=>{
        res.status(500).send({ message: err.message });
    })

});





router.get('/department', [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {
    Department.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send(
            err.message || "An Error Occured"
        )
    });
});


router.post('/department/add',[authJwt.verifyToken,authJwt.isAdmin],(req,res)=>{
    Department.create({
        name:req.body.name,      
    }).then(()=>{
        res.send({
            message: "Department Added Successfully"
        });
        res.end;
    }).catch(err=>{
        res.status(500).send(
            err.message || "An Error Occured"
        )
    });
})


router.get('/check', (req, res) => {
    res.send('hi');
});


module.exports=router;