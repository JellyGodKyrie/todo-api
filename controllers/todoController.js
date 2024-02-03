const Todo = require('../models/todo')
const User = require('../models/user')


exports.index = async function index (req, res) {
    try {
        const todos = await Todo.find({ user: req.user._id })
        res.status(200).json(todos)
    } catch (error) {
        res.status(400).json({ msg: error.msg })
    }
}

exports.create = async function create (req, res) {
    try {
        req.body.user = req.user._id
        const todo = await Todo.create(req.body)
        req.user.todos?
        req.user.todos.addToSet({ _id: todo._id }):
        req.user.todos = [{ _id: todo._id }]
        await req.user.save()
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({ msg: error.msg })
    }
}

exports.update = async function update (req, res) {
    try {
        const updateTodo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true } )
        res.status(200).json(updateTodo)
    } catch (error) {
        res.status(400).json({ msg: error.msg })
    }
}

exports.destroy = async function destroy (req, res) {
    try {
        const destroyTodo = await Todo.findOneAndDelete({ _id: req.params.id })
        res.status(200).json({ 
            msg: `Todo with the ID: ${destroyTodo._id}, Title: ${destroyTodo.title} has been deleted from the database.`
        }) 
    } catch (error) {
        res.status(400).json({ msg: error.msg })
    }
}

exports.show = async function show (req, res) {
    try {
        const showTodo = await Todo.findOne({ _id: req.params.id })
        res.status(200).json(showTodo)
    } catch (error) {
        res.status(400).json({ msg: error.msg })
    }
}