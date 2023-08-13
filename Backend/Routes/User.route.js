const express = require("express");
const User = require("../Models/User.model");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require('dotenv').config();

// getting all users
userRoute.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "All users data", AllUsers: users });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("There is something went wrong getting all users");
  }
});

// Create the user
userRoute.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const getUser = await User.findOne({ email: email });
    if (getUser) {
      return res.status(404).json({
        message: "Email with this user all registered",
      });
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        console.log(err.message);
        res
          .status(404)
          .json({ message: "Something went wrong at hashing the password" });
      } else {
        const user = new User({ name, email, password: hash });
        await user.save();
        res
          .status(201)
          .json({ message: "User created successfully", user: user });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("There is something went wrong create the user");
  }
});

// login the user

userRoute.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const isUser = await User.findOne({ email });
        if (!isUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashPassword = isUser.password;

        bcrypt.compare(password, hashPassword, async (err, result) => {
            if (result) {
                const token = jwt.sign({ userId: isUser._id }, process.env.secret, {
                    expiresIn: "1d",
                });
                res.status(200).json({
                    message: "User logged in successfully",
                    token: token,
                });
            } else {
                console.log(err.message);
                res.status(404).json({
                    message: "Something went wwrong at generating the token",
                });
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("There is something went wrong create the user");
    }
});

// reset password page

userRoute.post('/api/reset-password/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const newPassword = req.body.newPassword;
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(404).json({ message: "Invalid or expired token" });
        }

        // hash the newPassword
        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;

        user.reserToken = null;
        user.resetTokenExpiration = null;
        await user.save();

        res.status(200).json({
            message: "Password reset successful",
        });
    } catch (error) {
        console.log(error.message);
        res.
            status(500).
            send("Something went wrong with password reset");
    }
});

// forgot the password
//  Password reset request
userRoute.post("/api/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = crypto.randomBytes(20).toString("hex"); // Generate a reset token
        const resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour

        user.resetToken = resetToken;
        user.resetTokenExpiration = resetTokenExpiration;
        await user.save();

        // Send reset email
        const transporter = nodemailer.createTransport({
            service: "your-email-service", // e.g., "Gmail"
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const resetLink = `${process.env.APP_URL}/reset-password/${resetToken}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset",
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetLink}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).json({ message: "Error sending reset email" });
            } else {
                console.log("Email sent: " + info.response);
                res.status(200).json({ message: "Password reset email sent" });
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong with password reset");
    }
});

module.exports = userRoute;
