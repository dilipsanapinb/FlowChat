const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.port || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})