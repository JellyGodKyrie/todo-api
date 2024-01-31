require('dotenv').config()
const app = require ('./app')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.PORT)
mongoose.connect.once('open', () => {
    console.log(`connected to mongo`)
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
