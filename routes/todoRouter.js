const todoCtrl = require('../controllers/todoController')
const express = require('express')
const router = express.Router()


router.get('/', todoCtrl.index)

router.post('/', todoCtrl.create)

router.put('/:id', todoCtrl.update)

router.delete('/:id', todoCtrl.destroy)

router.get('/:id', todoCtrl.show)


module.exports = router