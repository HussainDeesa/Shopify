const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { json } = require('express');
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "Hussainisagoodboy"

let success = false

//ROUTE:1 Create a User POST "/api/auth/createuser"

router.post('/createuser', [
    body('name', 'Enter valid name of minimum 3 characters').isLength({ min: 3 }),
    body('password', 'Enter a password with atleat 7 characters').isLength({ min: 7 }),
    body('phone', 'Enter a valid phone number of 10 digits').isLength({max:10,min:10})
], async (req, res) => {
    // If error occurs then return bad request
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        success=false
        return res.status(400).json({ errors: errors.array() })
    }
    // Check if phone already exist
    try {
        let user = await User.findOne({ success,phone: req.body.phone })
        if (user) {
            success=false
            return res.status(400).json({ success,error: "Sorry a user with this phone number already exist" })
        }
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
        // create user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            phone:req.body.phone
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success=true
        // res.json(user)
        res.json({ success,authToken })
    } catch (error) {
        success=false
        console.error(error.message)
        res.status(500).send("Some Error Occured")
    }
})
//ROUTE:2 Authenticate a user using POST /api/auth/login

router.post('/login', [
    body('phone', 'Enter valid phone number').isMobilePhone(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { phone, password } = req.body;
    try {
        let user = await User.findOne({ phone })
        if (!user) {
            success = false
            return res.status(400).json({success,errors: "Please enter correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success,errors: "Please enter correct credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authToken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error Occured")
    }
})

//ROUTE:3 Get loggedin user details using POST: api/auth/getuser
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select('-password')
        res.json(user)
    } catch (error) {
        console.error(error.message)
       return res.status(500).send("Internal Server Error Occured")
    }
})

module.exports = router