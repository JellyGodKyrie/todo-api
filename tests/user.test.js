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

    test('This should login an existing user', async() => {
        const user = await new User({
            name: "Herbert Wright",
            email: "herbo@gmail.com",
            password: "nlmb4l"
        })
        await user.save()

        const response = await request(app)
        .post('/users/login')
        .send({
            name: "Herbert Wright",
            email: "herbo@gmail.com",
            password: "nlmb4l"
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual("Herbert Wright")
        expect(response.body.user.email).toEqual("herbo@gmail.com")
        expect(response.body).toHaveProperty("token")
    })

    test('This should allow an already authenticated user to update their account', async () => {
        const user = await new User({
            name: "Justin Tucker",
            email: "justin34@yahoo.com",
            password: "whynotme"
        })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
        .put(`/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Herbert I Dont Know Wright",
            email: "herboNEWLINE2@gmail.com"
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual("Herbert I Dont Know Wright")
        expect(response.body.email).toEqual("herboNEWLINE2@gmail.com")
    })
})
