const todoCtrl = require('../controllers/todoController')
const express = require('express')
const router = express.Router()

router.get('/', todoCtrl.index) // ok

router.post('/', todoCtrl.create) // ok

router.put('/:id', todoCtrl.update) // ok

router.delete('/:id', todoCtrl.destroy) // ok

router.get('/:id', todoCtrl.show) // good


module.exports = router