const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userController')

router.post('/', userCtrl.createUser)
router.post('/login', userCtrl.loginUser)
router.put('/:id', userCtrl.auth, userCtrl.updateUser)
router.delete('/:id', userCtrl.auth, userCtrl.deleteUser)

module.exports = router