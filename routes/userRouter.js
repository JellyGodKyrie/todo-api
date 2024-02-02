const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userController')

router.post('/', userCtrl.createUser) // good
router.post('/login', userCtrl.loginUser) // good
router.put('/:id', userCtrl.auth, userCtrl.updateUser) // 
router.delete('/:id', userCtrl.auth, userCtrl.deleteUser) // 

module.exports = router