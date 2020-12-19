const { Com } = require("../db")

exports.createCom = (req, res, next) => {
    console.log(req.body)
    const newCom = Com.build(req.body)
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
            Object.assign(comToUpdate, req.body)
            comToUpdate.save()
                .then(() => res.status(200).json({ message: "Commentaire modifié !" }))
                .catch(error => res.status(400).json({ error }))
        })
}

exports.deleteCom = (req, res, next) => {
    Com.destroy({
        where: {
            id: req.params.id
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