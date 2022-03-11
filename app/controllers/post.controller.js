const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const fs = require('fs');

const { secret } = require('../config/config')
const dtpost = require('../database/dt.post')
const dtUser = require('../database/dt.users')

class PostController {
    async createPost(req, res) {
        try {
            const idMedia = req.files ? Date.now() + '_' + req.files.file.name : null
            const { title, text } = req.body
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({ message: 'You need to login' })
            }
            const { id: userId } = jwt.verify(token, secret)
            const newPost = await dtpost.newPost(title, text, userId, idMedia)
            if (idMedia !== null) {
                req.files.file.mv('app/image/' + idMedia)
            }
            res.status(201).json({ message: 'Post created successfully' })
        } catch (error) {
            res.status(500).send({
                message:
                    error.message || "Some error occurred while creating the post."
            })
        }
    }

    async getPostsFromUser(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({ message: 'You need to login' })
            }
            const { id: userId } = jwt.verify(token, secret)
            const Posts = await dtpost.getPostsFromUser(userId)
            res.status(200).json(Posts)
        } catch (error) {
            res.status(500).send({
                message:
                    error || "Some error occurred while get the post."
            })
        }
    }

    async getPosts(req, res) {
        try {
            const getPosts = await dtpost.getPosts()
            /*const usersId = getPosts.map( async (elem) => {
                const id = elem.dataValues.userId
                const logins = await dtUser.getAllUsers(id)
                const login = {
                    login: logins[0].dataValues.login
                }
                return login
            })
            .then( (data) => {
                console.log(data);
            })*/
            res.status(200).json(getPosts)
        } catch (error) {
            res.status(500).send({
                message:
                    error || "Some error occurred while get the post."
            })
        }
    }

    async updatePost(req, res) {
        try {
            const mediaId = req.files ? Date.now() + '_' + req.files.file.name : null
            const { title, text, postId } = req.body
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({ message: 'You need to login' })
            }
            const { id: userId } = jwt.verify(token, secret)
            const updatePost = await dtpost.updatePost(postId, title, text, userId, mediaId)
            if (updatePost !== null) {
                fs.unlink('app/image/' + updatePost[0].dataValues.idMedia, (err) => {
                    if (err) throw (err)
                })
            }
            if (mediaId !== null) {
                req.files.file.mv('app/image/' + mediaId)
                return res.status(200).json({ message: 'Post updated successfully' })
            }
        } catch (error) {
            res.status(500).send({
                message:
                    error.message || "Some error occurred while updated the post."
            })
        }
    }

    async deletePost(req, res) {
        try {
            const postId = req.body.id
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({ message: 'You need to login' })
            }
            const { id: userId } = jwt.verify(token, secret)
            const deletePost = await dtpost.deletePost(postId, userId)
            if (!deletePost) return res.status(400).json({ message: 'Error' })
            fs.unlink('app/image/' + deletePost[0].dataValues.idMedia, (err) => {
                if (!err) return res.status(200).json({ message: 'Post deleted successfully' })
                return res.status(400).json({ message: 'Error deleted file' })
            })
        } catch (error) {
            res.status(500).send({
                message:
                    error.message || "Some error occurred while updated the post."
            })
        }
    }
}

module.exports = new PostController()