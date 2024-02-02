const express = require('express')
const morgan = require('morgan')
const app = express()
const todoRouter = require('./routes/todoRouter')
const userRouter = require('./routes/userRouter')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined'))
app.use('/todos', todoRouter)
app.use('/users', userRouter)

module.exports = app