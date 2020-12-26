const { Com } = require("../db")

exports.createCom = (req, res, next) => {
    let comObject = req.body
    comObject["UserId"] = req.locals.userId
    const newCom = Com.build(comObject)
    newCom.save()
        .then(() => res.status(201).json({ message: "Commentaire enregistré !" }))
        .catch(error => {
            console.log(error)
            res.status(400).json({ error })
        })
}

exports.modifyCom = (req, res, next) => {
    Com.findByPk(req.params.id)
        .then((comToUpdate) => {
            if (req.locals.userId != comToUpdate.UserId)
                return res.status(401).json({ message: "Tu va te faire bouillave" })

            comToUpdate.text = req.body.text
            comToUpdate.save()
                .then(() => res.status(200).json({ message: "Commentaire modifié !" }))
                .catch(() => res.status(400).json({ message: "Oops ! Une erreur est survenue !" }))
        })
        .catch(() => res.status(400).json({ message: "Oops ! Une erreur est survenue !" }))

}

exports.deleteCom = (req, res, next) => {
    Com.destroy({
        where: {
            id: parseInt(req.params.id),
            UserId: req.locals.userId,
        }
    })
        .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
        .catch(error => res.status(400).json({ error }))
}

exports.getCom = (req, res, next) => {
    Com.findAll()
        .then(com => res.status(200).json(com))
        .catch(error => res.status(400).json({ error }))
}