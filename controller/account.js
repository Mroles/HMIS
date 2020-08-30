var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.user;
const Dept = db.department;
const Role = db.role;
const Op = db.Sequelize.Op;
require('dotenv').config();

var {
    verifySignUp
} = require('../middleware');

var {
    authJwt
} = require('../middleware');
var jwt = require("jsonwebtoken");



router.post('/signin', (req, res) => {
    console.log(req.body);
    console.log(process.env.ACCESSTOKEN);
    User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User Not found."
                });
            }
            Dept.findOne({
                where: {
                    id: user.departmentId
                }
            }).then(dept => {
                if (!dept) {
                    return res.status(404).send({
                        message: "User Not found."
                    });
                }
                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );
                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
                }

                var token = jwt.sign({
                    id: user.id
                }, process.env.ACCESSTOKEN, {
                    expiresIn: 86400 // 24 hours
                });

                var authorities = [];
                user.getRoles().then(roles => {
                    for (let i = 0; i < roles.length; i++) {
                        authorities.push("Role: " + roles[i].name.toUpperCase());
                    }
                    res.status(200).send({
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        staffid: user.staffid,
                        departmentid: user.departmentId,
                        departmentname: dept.name,
                        roles: authorities,
                        accessToken: token
                    });
                });

            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
});


router.post('/bypass/user/add', (req, res) => {
    console.log(req.body);
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        fullname: req.body.fullname,
        departmentId: req.body.departmentid,
        staffid: req.body.staffid,
    }).then((user) => {
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({
                        message: "User Registered Successfully"
                    });
                })
            })
        } else {
            user.setRoles([3]).then(() => {
                res.send({
                    message: "User was registered successfully!"
                });
            })
        }

    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
});



module.exports = router