const express = require('express')
const route = express.Router()
const UserData = require('../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const requireLogin = require('../midlleware/requireLogin')



// post 
route.post('/signup', (req, res) => {


    const { name, email, password } = req.body
    if (!name || !email || !password)
    {
        return res.status(422).json({ Error: "plasese fill the  fileds" })

    }
    UserData.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser)
            {
                return res.status(422).json({ error: "User Email already exist. please  try with another Email" })
            }
            else
            {
                bcrypt.hash(password, 12)
                    .then(passwordHashing => {
                        const user = new UserData({
                            email,
                            name,
                            password: passwordHashing,


                        })
                        user.save()
                            .then(user => {
                                res.json({ message: "User Registration Succcessful !! " })
                            })
                    })

            }
        })

})
















route.post('/signin', (req, res) => {

    const { email, password } = req.body
    if (!email || !password)
    {
        res.status(422).json({ error: "please fill all required fields" })
    }
    else
    {

        UserData.findOne({ email: email })
            .then(savedUser => {
                if (!savedUser)
                {
                    res.status(422).json({ error: "invalid email or password" })
                }

                else
                {

                    bcrypt.compare(password, savedUser.password)
                        .then(doMatch => {
                            if (doMatch)
                            {

                                const token = jwt.sign({ _id: savedUser._id, }, process.env.KEY)
                                const { _id, name, email } = savedUser
                                res.send({ token: token, user: { _id, name, email } });

                                // res.json({ message: "User signin Succcessful !! " })

                            }
                            else
                            {
                                res.status(422).json({ error: "invalid email or password" })
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            })


    }


})


route.get('/joshua', requireLogin, (req, res) => {
    res.send('hello User')
})


module.exports = route