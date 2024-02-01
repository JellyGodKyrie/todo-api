const todoCtrl = require('../controllers/todoController')
const userCtrl = require('../controllers/userController')
const express = require('express')
const router = express.Router()

router.get('/', userCtrl.auth ,todoCtrl.index) 

router.post('/', userCtrl.auth, todoCtrl.create) 

router.put('/:id', userCtrl.auth, todoCtrl.update) 

router.delete('/:id', userCtrl.auth, todoCtrl.destroy) 

router.get('/:id', userCtrl.auth, todoCtrl.show) 


module.exports = router