const jwt = require("jsonwebtoken");
const config = require("../config/authconfig.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};


isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    console.log(req.body);
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Unauthorized Access!"
      });
      return;
    });
  });
};

isDoctor=(req,res,next)=>{
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Unauthorized Access!"
      });
      return;
    });
  });
};


isNurse=(req,res,next)=>{
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "nurse") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Unauthorized Access!"
      });
      return;
    });
  });
};



const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
module.exports = authJwt;