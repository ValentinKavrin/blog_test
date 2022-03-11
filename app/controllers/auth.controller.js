const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')
const dtAuth = require('../database/dt.users')


const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, { expiresIn: "24h" })
}

// Create and login a new user
class AuthController {
    async registration(req, res) {
        try {
            // Validate request
            const { login, firstName, secondName, password } = req.body
            console.log(req.body);
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Error', errors })
            }
            if (!login || !firstName || !secondName || !password) {
                return res.status(400).send({ message: "Content can not be empty!" });
            }
            const user = await dtAuth.getUser(login)
            if (user.length) {
                return res.status(409).send({ message: 'User has been already registered' })
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            // Create and save user
            const newUser = await dtAuth.newUser(login, firstName, secondName, hashPassword)
            res.status(201).json({ message: 'User registered successfully' })
        } catch (error) {
            res.status(500).send({
                message:
                    error || "Some error occurred while creating the user."
            })
        }
    }

    async login(req, res) {
        try {
            const { login, password } = req.body
            const data = await dtAuth.getUser(login)

            if (!data.length) {
                return res.status(409).json({ message: `user with nickname '${login}' does not exist` })
            }
            const validPassword = bcrypt.compareSync(password, data[0].dataValues.password)
            if (!validPassword) {
                return res.status(401).json({ message: 'Password incorrect' })
            }
            const token = generateAccessToken(data[0].dataValues.id)
            return res.status(200).json(token)

        } catch (error) {
            res.status(500).send({
                message:
                    error || "Some error occurred while login the user."
            });
        }
    }
}

module.exports = new AuthController()