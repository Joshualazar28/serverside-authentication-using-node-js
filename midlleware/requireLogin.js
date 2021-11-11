const mongoose = require('mongoose')
const UserData = require('../models/User')
const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization)
    {
        return res.status(401).json({ error: "you must be logged in" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, process.env.KEY, (err, payload) => {
        if (err)
        {
            return res.status(401).json({ error: "you must be logged in" })
        }

        const { _id } = payload
        UserData.findById(_id).then(userdata => {
            req.user = userdata
            next()
        })


    })
}




