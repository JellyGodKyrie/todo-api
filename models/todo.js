const { model, Schema } = require('mongoose')

const todoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
})

const Todo = model('Todo', todoSchema)

module.exports = Todo