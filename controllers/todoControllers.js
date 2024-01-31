const Todo = require('../models/todo')



exports.index = async function index(req, res) {
    try {
        const todos = await Todo.find({})
        res.status(200).json(todos)
    } catch (error) {
        res.status(400).json({msg: error.msg})
    }
}

exports.index = async function create(req, res) {
    try {
        const todo = await Todo.create(req.body)
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({msg: error.msg})
    }
}

exports.index = async function update(req, res) {
    try {
        const updateTodo = await Todo.findOneAndUpdate({
            _id: req.params.id
        })
    } catch (error) {
        res.status(400).json({msg: error.msg})
    }
}

exports.index = async function destroy(req, res) {
    try {
        
    } catch (error) {
        res.status(400).json({msg: error.msg})
    }
}

exports.index = async function show(req, res) {
    try {
        
    } catch (error) {
        res.status(400).json({msg: error.msg})
    }
}