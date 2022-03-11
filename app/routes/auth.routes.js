const Router = require('express')
const {check} = require("express-validator")

const authController= require('../controllers/auth.controller')

const router = new Router()

router.post('/registration', [
    check('login', "Username cannot be empty").notEmpty(),
    check('password', "Password must be more than 3 characters").isLength({min:3})
], authController.registration)
router.post('/login', authController.login)

module.exports = router