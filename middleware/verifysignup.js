const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

checkStaffId=(req,res,next)=>{
  User.findOne({
    where: {
      staffid: req.body.staffid
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Staff ID is already in use!"
      });
      return;
    }
    next();
});
}

const verifySignUp = {
  checkUsernameOrEmail: checkUsernameOrEmail,
  checkStaffId:checkStaffId
  
};



module.exports = verifySignUp;