/*

router.get('/', todoCtrl.index) // see that i can make a request to this route. het back a list of valid todos, or an empty array if its empty.

router.post('/', todoCtrl.create) // make sure that I can create a todo

router.put('/:id', todoCtrl.update) // make sure i get a valid id and valid body so that i can change an existing todo

router.delete('/:id', todoCtrl.destroy) // make sure I get a valid id so that i can delete/destroy and existing todo

router.get('/:id', todoCtrl.show) // make sure i get a valid id so i can see an existing todo

*/

const mongoose = require('mongoose')
const app = require('../app')
const { MongoMemoryServer } = require('mongodb-memory-server')
const request = require('supertest')
const server = app.listen('8080', () => console.log('Lets test'))
const Todo = require('../models/todo')
let mongoServer

beforeAll(async() => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async() => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe('Testing Todo Endpoints For A RESTFUL JSON API', () => {
    test('It should display a list of todos', async () => {
        const todo = new Todo({
            title:'test one',
            description: 'test',
            completed: true
        })
        await todo.save()

        const response = await request(app).get('/todos')

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
        const response = await request(app).post('/todos').send({
            title: "todo post",
            description: "testing post todo",
            completed: false
        })

        expect(response.body.title).toEqual('todo post')
        expect(response.body.description).toEqual('testing post todo')
        expect(response.body.copleted).toBeFalsy()
    })
})