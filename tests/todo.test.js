const mongoose = require('mongoose')
const app = require('../app')
const { MongoMemoryServer } = require('mongodb-memory-server')
const request = require('supertest')
const server = app.listen('8080', () => console.log('Lets test'))
const Todo = require('../models/todo')
const User = require('../models/user')
let mongoServer

beforeAll(async() => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async() => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe('Testing Todo Endpoints For A RESTFUL JSON API', () => {
    test('It should display an authenticated users list of todos', async () => {
        const user = await new User({
            name: "Joe Buzzin",
            email: "joebees@yahoo.com",
            password: "password123"
        })
        await user.save()
        const token = await user.generateAuthToken()

        const todo = new Todo({
            title:'test one',
            description: 'test',
            completed: true
        })
        await todo.save()

        const response = await request(app)
        .get('/todos')
        .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBeTruthy()
        
        for (let i = 0; i < response.body.length; i++) {
            expect(response.body[i]).toHaveProperty('title')
            expect(response.body[i]).toHaveProperty('description')
            expect(response.body[i]).toHaveProperty('completed')
            expect(response.body[i]).toHaveProperty('createdAt')
        }
    })

    test('I should be able to create a new Todo', async () => {
        const user = await new User({
            name: "Justin Tucker",
            email: "justin34@yahoo.com",
            password: "whynotme"
        })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
        .post('/todos')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: "todo post",
            description: "testing post todo",
            completed: false
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('todo post')
        expect(response.body.description).toEqual('testing post todo')
        expect(response.body.completed).toBeFalsy()
    })

    test('Given an already existing todo, update an existing todo', async () => {
        const user = await new User({
            name: "Jalen Brunson",
            email: "jbthegoat@gmail.com",
            password: "howaboutthem"
        })
        await user.save()
        const token = await user.generateAuthToken()

        const todo = new Todo({
            title:'test one',
            description: 'test',
            completed: true
        })
        await todo.save()

        const response = await request(app)
        .put(`/todos/${todo._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            description: `new altered description`
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.description).toEqual('new altered description')
    })

    test('Given a already existing ID, delete a todo', async () => {
        const user = await new User({
            name: "Jackie Chan",
            email: "rushhour2@yahoo.com",
            password: "thebest"
        })
        await user.save()
        const token = await user.generateAuthToken()

        const todo = new Todo({
            title:'test one',
            description: 'test',
            completed: true
        })
        await todo.save()

        const response = await request(app)
        .delete(`/todos/${todo._id}`)
        .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toEqual(`Todo with the ID: ${todo._id} has been deleted from the database.`)
    })

    test('It should show a specific todo that already exists', async () => {
        const user = await new User({
            name: "Joseph Winchester",
            email: "curtisne@icloud.com",
            password: "icecreamtruck"
        })
        await user.save()
        const token = await user.generateAuthToken()

        const todo = new Todo({
            title:'test one',
            description: 'test',
            completed: true
        })
        await todo.save()

        const response = await request(app)
        .get(`/todos/${todo._id}`)
        .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('test one')
        expect(response.body.description).toEqual('test')
        expect(response.body.completed).toBeTruthy()
    })

})