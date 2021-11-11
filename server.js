const express = require('express')
const app = express()
const auth = require('./routes/auth')
require('dotenv').config()
const ConnectDB = require('./config/db')
app.use(express.json())

app.use(auth)

ConnectDB()


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});