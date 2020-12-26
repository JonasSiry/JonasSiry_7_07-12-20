const fs = require("fs")
const { Post, User, Com } = require("../db")

const userInclude = {
    model: User,
    attributes: ['firstName', 'lastName', 'email', 'id', 'admin']
}
const comInclude = {
    model: Com,
    as: 'Coms',
    attributes: ['text', 'createdAt', 'updatedAt', 'id'],
    include: [{ ...userInclude }]
}

exports.createPost = (req, res, next) => {
    let postObject = req.body
    if (req.file) {
        postObject["imageUrl"] = req.file.filename
    }
    postObject["UserId"] = req.locals.userId
    const newPost = Post.build(postObject)
    newPost.save()
        .then(() => res.status(201).json({ message: "Post enregistré !" }))
        .catch(() => {
            res.status(400).json({ message: "Oops ! Une erreur est survenue !" })
        })
}

exports.modifyPost = (req, res, next) => {
    Post.findByPk(req.params.id)
        .then((postToUpdate) => {
            if (req.locals.userId != postToUpdate.UserId && req.locals.admin != true)
                return res.status(401).json({ message: "Non non petit hacker !" })
            if (req.file) {
                fs.unlinkSync(`images/${postToUpdate.imageUrl}`)
                postToUpdate["imageUrl"] = req.file.filename
            }
            Object.assign(postToUpdate, req.body)
            postToUpdate.save()
                .then(() => res.status(200).json({ message: "Post modifié !" }))
                .catch(() => res.status(400).json({ message: "Oops ! Une erreur est survenue !" }))
        })
        .catch(() => res.status(400).json({ message: "Oops ! Une erreur est survenue !" }))
}

exports.deletePost = (req, res, next) => {
    Post.findByPk(req.params.id)
        .then(post => {
            if (req.locals.userId != post.UserId && req.locals.admin != true)
                return res.status(401).json({ message: "Non non petit hacker !" })
            fs.unlink(`images/${post.imageUrl}`, () => {
                Post.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                    .then(() => res.status(200).json({ message: "Post supprimé !" }))
                    .catch(() => res.status(400).json({ message: "Oops ! Une erreur est survenue !" }))
            })
        })
        .catch(() => res.status(500).json({ message: "Oops ! Une erreur est survenue !" }))
}

exports.getOnePost = (req, res, next) => {
    Post.findByPk(req.params.id, { include: [userInclude, comInclude], order: [['Coms', 'createdAt', 'ASC']] })
        .then(post => res.status(200).json({ post }))
        .catch((e) => res.status(404).json({ message: e }))
}

exports.getPost = (req, res, next) => {
    let offset = req.query.offset ? parseInt(req.query.offset) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 5;
    Post.count().then((count) => {
        Post.findAll({ limit, offset })
            .then(posts => res.status(200).json({ posts, count }))
    })
        .catch((e) => {
            res.status(400).json({ message: "Oops ! Une erreur est survenue !" })
        })
}