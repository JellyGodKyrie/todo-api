const request = require('supertest')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const User = require('../models/user')
const mongoose = require('mongoose');
const server = app.listen(3001, () => {
    console.log('Testing on port 3001 active')
})
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe('Testing For All User Routes in API', () => {
    test('This should create a new user', async() => {
        const response = await request(app)
        .post('/users')
        .send({ name: 'Jalen Brunson', email: 'jb4mvp@email.com', password: 'password' })

        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('Jalen Brunson')
        expect(response.body.user.email).toEqual('jb4mvp@email.com')
        expect(response.body).toHaveProperty('token')
    })
})
