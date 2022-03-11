const Router = require('express')
const {check} = require("express-validator")

const authMiddleware = require('../middlewaree/authMiddlewaree')
const postController= require('../controllers/post.controller')
const router = new Router()

router.post('/post', [
    check('title', "You need to write a title").notEmpty(),
    check('text', "Please enter a description of more than 3 characters").isLength({min:3})
], authMiddleware,  postController.createPost)
router.get('/posts/user/', authMiddleware, postController.getPostsFromUser)
router.get('/posts/', authMiddleware, postController.getPosts)
router.put('/post/', authMiddleware, postController.updatePost)
router.delete('/post/', authMiddleware, postController.deletePost)

module.exports = router

