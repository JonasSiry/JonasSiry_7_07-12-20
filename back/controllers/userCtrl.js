// Fichier responsable des fonctions en lien avec les utilisateurs


const bcrypt = require("bcrypt")
const { unlinkSync } = require("fs")
const jwt = require("jsonwebtoken")
const { User, Post } = require("../db")

const postInclude = {
    model: Post,
    attributes: ['imageUrl']
}

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.build({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash
            })
                .save()
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                .catch(error => {
                    if (error.name == "SequelizeUniqueConstraintError")
                        return res.status(400).json({ message: "Cet email est déjà utilisé !" })
                    res.status(400).json({ message: "Une erreur est survenue !" })
                })
        })
        .catch(() => res.status(500).json({ message: "Oops ! Une erreur est survenue !" }))
}

exports.login = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé !" })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" })
                    }
                    res.status(200).json({
                        user: {
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            id: user.id,
                            admin: user.admin
                        },
                        token: jwt.sign(
                            {
                                userId: user.id,
                                admin: user.admin
                            },
                            process.env.APP_SECRET,
                            { expiresIn: "24h" }
                        )
                    })
                })
                .catch(() => res.status(500).json({ message: "Oops ! Une erreur est survenue !" }))
        })
        .catch(() => res.status(500).json({ message: "Oops ! Une erreur est survenue !" }))
}

exports.logUpdate = (req, res, next) => {
    User.findByPk(req.params.id)
        .then((userToUpdate) => {
            if (req.locals.userId != req.params.id) {
                return res.status(401).json({ message: "Non non petit hacker !" })
            }
            Object.assign(userToUpdate, req.body)
            if (req.body.password) {
                userToUpdate["password"] = bcrypt.hashSync(req.body.password, 10)
            }
            userToUpdate.save()
                .then(() => res.status(200).json({ message: "Utilisateur modifié !" }))
                .catch(error => {
                    if (error.name == "SequelizeUniqueConstraintError")
                        return res.status(400).json({ message: "Cet email est déjà utilisé !" })
                    res.status(400).json({ message: "Une erreur est survenue !" })
                })
        })
        .catch(() => res.status(400).json({ message: "Oops ! Une erreur est survenue !" }))
}

exports.logDelete = (req, res, next) => {
    User.findByPk(parseInt(req.locals.userId), { include: [postInclude] })
        .then((userToDelete) => {
            userToDelete.Posts.forEach((post) => unlinkSync(`images/${post.imageUrl}`))
            userToDelete.destroy()
                .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
                .catch(() => res.status(400).json({ message: "Oops ! Une erreur est survenue !" }))
        })
        .catch((error) => res.status(500).json({ error }))
}

exports.isAuth = (req, res, next) => {
    res.status(200).json({ message: "yes" })
}