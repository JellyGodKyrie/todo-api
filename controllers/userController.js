require('dotenv').config()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { response } = require('../app')

exports.auth = async function (req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({ _id: data._id })
        if (!user) {
            throw new Error('Invalid credentials')
        } else {
            req.user = user
        }
        next()
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}

exports.createUser = async function (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.json({ user, token })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.loginUser = async function (req, res) => {
    
}

exports.deleteUser = async function (req, res) => {
    
}

exports.updateUser = async function (req, res) => {
    
}