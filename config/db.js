const mongoose = require('mongoose')

const ConnectDB = async () => {
    try
    {
        const conn = await mongoose.connect('mongodb+srv://joshualazar:joshua123@cluster0.mbapz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        console.log(`Mongodb  connect `)
    }
    catch (error)
    {
        console.log(`Mongodb Not connect `)

    }

}

module.exports = ConnectDB