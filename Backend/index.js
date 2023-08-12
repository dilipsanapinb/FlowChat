const express = require('express');
require('dotenv').config();
const userRoute=require('./Routes/User.route')
const connection = require('./Config/db');
const cors = require('cors')
const app = express();
const PORT = process.env.port || 5001;

// cors middleware
app.use(cors());

// express-json middleware

app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to FlowChat App: Way to express yourself" })
});


// Routes
app.use('/user',userRoute)

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error.message);
        console.log('Error in connectiong to Db');
    }
    console.log(`Server is running on port: ${PORT}`);
})