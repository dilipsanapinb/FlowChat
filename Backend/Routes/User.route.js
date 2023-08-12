const express = require('express');
const User=require('../Models/User.model')
const userRoute = express.Router();


// getting all users
userRoute.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: "All users data", 'AllUsers': users })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("There is something went wrong at getting the users");
    }
});

module.exports = userRoute;