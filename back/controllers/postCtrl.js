const fs = require("fs")
const { Post } = require("../db")

exports.createPost = (req, res, next) => {
    let postObject = req.body
    if (req.file) {
        postObject["imageUrl"] = req.file.filename
    }
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
    Post.findByPk(req.params.id)
        .then(post => res.status(200).json(post))
        .catch(() => res.status(404).json({ message: "Oops ! Une erreur est survenue !" }))
}

exports.getPost = (req, res, next) => {
    Post.findAll()
        .then(post => res.status(200).json(post))
        .catch(() => res.status(400).json({ message: "Oops ! Une erreur est survenue !" }))
}