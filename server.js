require('dotenv').config()
const app = require ('./app')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 1999

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
    console.log(`connected to mongo`)
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
