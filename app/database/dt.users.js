const db = require("../models");
const users = db.users;
const Op = db.Sequelize.Op;

const newUser = async function (login, firstName, secondName, hashPassword) {
    try {
        const newUser = await users.create({
            login: login,
            firstName: firstName,
            secondName: secondName,
            password: hashPassword
        })
        return newUser
    } catch (error) {
        throw(error)
    }
}

const getUser = async function (login) {
    try {
        const user = await users.findAll({
            where: {
                login: login
            }
        })
        return user
    } catch (error) {
        throw(error)
    }
}

const getAllUsers = async function (id) {
    try {
        const allUsers = await users.findAll({
            where: {
                id: id
            }
        })
        return allUsers
    } catch (error) {
        throw(error)
    }
}

module.exports = {
    newUser,
    getUser,
    getAllUsers,
}