const { json } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const protected = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(404).json({ message: "Token not found, please login first" });
        }
        const decoded = jwt.verify(token, process.env.secret);
        if (decoded) {
            req.body.userId = decoded.userId;
            next();
        }
    } catch (error) {
        console.log(error.message);
        res
            .status(500)
            .json({
                message: "Something went wrong at authetication middleware",
            });
    }
}

module.exports = protected;