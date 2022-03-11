const db = require("../models");
const Op = db.Sequelize.Op;
const posts = db.posts;

const newPost = async function (title, text, userId, idMedia) {
    try {
        const newPost = await posts.create({
            title: title,
            text: text,
            idMedia: idMedia,
            userId: userId
        })
        return newPost
    } catch (error) {
        throw(error)
    }
}

const getPostsFromUser = async function (userId) {
    try {
        const getPostsFromUser = await posts.findAll({
            where: {
                userId: userId
            }
        })
        return getPostsFromUser
    } catch (error) {
        throw(error)
    }
    
}

const getPosts = async function () {
    try {
        const getPosts = await posts.findAll()
        return getPosts
    } catch (error) {
        throw(error)
    }
}

const updatePost = async function (postId, title, text, userId, mediaId) {
    try {
        const idMedia = await posts.findAll({
            attributes: ['idMedia'],
            where: {
                [Op.and]: [{id: postId}, {userId: userId}]
            }
        })
        const updatePost = await posts.update({
            title: title,
            text: text,
            idMedia: mediaId
        }, { where: {
            [Op.and]: [{id: postId}, {userId: userId}]
        }})
        return idMedia
    } catch (error) {
        throw(error)
    }
}

const deletePost = async function (postId, userId) {
    try {
        const idMedia = await posts.findAll({
            attributes: ['idMedia'],
            where: {
                [Op.and]: [{id: postId}, {userId: userId}]
            }
        })
        const deletePost = await posts.destroy({
            where: {
                [Op.and]: [{id: postId}, {userId: userId}]
            }
        })
        if (deletePost !== 0) return idMedia
        return false
    } catch (error) {
        throw(error)
    }
}

module.exports = {
    newPost,
    getPostsFromUser,
    getPosts,
    updatePost,
    deletePost
}