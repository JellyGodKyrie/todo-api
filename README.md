# The ToDo API

This API was created to help you keep track of that busy life of yours. This API allows users to create & login an account. Users can make new todo posts, update & delete existing todo posts. Users will also be able to view all posts created by that user.

# Installation

1. Clone the repo
```bash
git clone git@github.com:JellyGodKyrie/todo-api.git
```

2. Change into the cloned repo
```bash
cd todo-api
```
3. Open the code
```bash
code .
```
4. Install the necessary packages & dependencies
```bash
npm i express mongoose dotenv bcrypt jsonwebtoken morgan

npm i -D jest supertest mongodb-memory-server artillery@1.7.9

npm i -D nodemon
```
5. Create a .gitignore & add the following lines
```bash
node_modules/
.env
```
6. Create a .env file
```bash
touch .env
```
7. Add MONGO_URI & 'SECRET' to .env
```bash
MONGO_URI=" "
SECRET=" "
```

## Running Tests

1. In package.json, ensure the following line of code is included in the "scripts" section
```bash
"scripts": {
  "test": "jest",
  "start": "node server.js",
  "dev": "nodemon",
  "load": "artillery run artillery.yml"
},
"jest": {
  "testEnvironment": "node"
},
```
2. Run ```npm run test``` to start testing

## Manual Testing Routes via Postman
1. Run ``` npm run dev ```
2. Routes to Check

3. Users
 ``` 
  userCtrl.createUser -> POST REQUEST to localhost:1999/users/

  userCtrl.loginUser -> POST REQUEST to localhost:1999/users/login

  userCtrl.updateUser -> PUT REQUEST to localhost:1999/users/:id

  userCtrl.deleteUser -> DELETE REQUEST to localhost:1999/users/:id
  ```
3a. User Routes Response Example

router.post('/', userCtrl.createUser)
```
{
    "user": {
        "name": "Jojo Johnson",
        "email": "jojo@dvf.com",
        "password": "$2b$08$E9gWX63tnYWq04.VkkTgWufBFjQmqQ.4xhGFmVLMRE81Fp/9chUwG",
        "todos": [],
        "_id": "65bdfe5a48ed28ec14609c32",
        "createdAt": "2024-02-03T08:50:34.503Z",
        "updatedAt": "2024-02-03T08:50:34.503Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJkZmU1YTQ4ZWQyOGVjMTQ2MDljMzIiLCJpYXQiOjE3MDY5NTAyMzR9.06z1PV3KkYL1o1YlvKwPe9JnnYAzNu8DChHVelbBYBw"
}

```

4. Todos
```
todoCtrl.index -> GET REQUEST to localhost:1999/todos/

todoCtrl.create -> POST REQUEST to localhost:1999/todos/

todoCtrl.update -> PUT REQUEST to localhost:1999/todos/:id

todoCtrl.destroy -> DELETE REQUEST to localhost:1999/todos/:id

todoCtrl.show -> GET REQUEST to localhost:1999/todos/:id

```
4a. Todos Route Example Response

```
[
    {
        "_id": "65bdd2fbf6d4555bd2bc93cd",
        "title": "HELLO DONT FORGET",
        "description": "dont forget",
        "completed": false,
        "user": "65bd93cfc2feee18fee7f627",
        "createdAt": "2024-02-03T05:45:31.654Z",
        "updatedAt": "2024-02-03T05:45:31.654Z",
        "__v": 0
    }
]
```


## Understanding Tests

The API is broken down into 2 models, the User & Todos.

Users: 
```
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
}, {
    timestamps: true
})

```
The User model handles everything needed for someone to successfully create, authenticate, login & delete users.

Todos:
```
const todoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
})
```
The Todos model includes everything needed to make a todo post that links to your authorized User account.


