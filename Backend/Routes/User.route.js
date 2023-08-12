const express = require('express');
const User=require('../Models/User.model')
const userRoute = express.Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')

// getting all users
userRoute.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: "All users data", 'AllUsers': users })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("There is something went wrong getting all users");
    }
});

// Create the user
userRoute.post('/api/user', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" })
        }

        const getUser = await User.findOne({ 'email': email });
        if (getUser) {
            return res.status(404).json({
                message:
                    "Email with this user all registered"
            })
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                console.log(err.message);
                res.
                    status(404).
                    json({ message: "Something went wrong at hashing the password" })
            } else {
                const user = new User({ name, email, password: hash });
                await user.save();
                res
                    .status(201)
                    .json({ message: "User created successfully", user: user });
            }
            
        })

    } catch (error) {
        console.log(error.message);
        res.
            status(500).
            send("There is something went wrong create the user");
    }
});

module.exports = userRoute;