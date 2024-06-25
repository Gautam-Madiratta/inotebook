const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser=require("../middleware/fetchuser")

const JWT_Secret = "gautammadiratta@12&1";

const { validationResult, body } = require("express-validator");

//Create a User using : Post "/api/auth" doesn't requre login
router.post(
  "/createuser",
  //checks for the entered things. validated in async with validation
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("password", "Password must be atleast five character").isLength({
      min: 5,
    }),
    body("email", "Enter a Valid Email").isEmail(),
  ],
  async (req, res) => {
    //if there are errors return bad request and the errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success ,errors: errors.array() });
    }
    //Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });

      //if user exists we return a 400 error and a json message
      if (user) {
        return res
          .status(400)
          .json({ success,error: "Sorry the user with this email exists already" });
      }

      //hashing password and adding salt to it
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //Creating a user in DB and adding the details
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      }).catch((err) => {
        console.log(err);
      });

      //not sure why?
      const data = {
        user: {
          id: user.id,
        },
      };

      // creating a token to send to user after succesfull creation of account adding secret password to id
      const authtoken = jwt.sign(data, JWT_Secret);
      success=true;
      res.json({success,authtoken});
    } catch (error) {
      console.log(error.message);
      success=false;
      res.status(500).send({success,error:"Some Error Occurred"});
    }
  }
);

//Login a User and send Jwt TOKEN using : Post "/api/auth" doesn't requre login
router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Enter a valid Password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success = false;
    //destructing the body to store email and body
    const { email, password } = req.body;

    try {
      //finding the email in database and storing in user
      let user = await User.findOne({ email });

      //if email entered is wrong i.e no email found in the DB
      if (!user) {  
        return res.status(404).json({success, error:"Invalid Email or Password"});
      }

      //comparing password sent through json with the encrypted password in the database with hashing and salt
      const passwordCompare = await bcrypt.compare(password, user.password);

      //if password is not matched
      if (!passwordCompare) {
        return res.status(404).json({success, error:"Invalid Email or Password"});
      }

      //undetstand this
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_Secret);
      success=true
      res.json({success,authtoken});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Occurred");
    }
  }
);

//Route 3: Get loggedin user details login required
router.post(
  "/user",fetchuser,
  async (req, res) => {
    try {
      const userID=req.user.id;
      const user = await User.findById(userID).select("-password");
      res.json(user)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Occurred");
    }
    
  }
);


module.exports = router;
