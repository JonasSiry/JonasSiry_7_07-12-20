const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null
        const decodedToken = jwt.verify(token, process.env.APP_SECRET)
        req.locals.userId = decodedToken.userId
        req.locals.admin = decodedToken.admin
        if (req.body.userId && req.body.userId !== req.locals.userId) {
            throw "User ID non valable !"
        }
        else {
            next()
        }
    }
    catch (error) {
        console.log(error)
        res.status(401).json({ error: error | "Requête non authentifiée !" })
    }
}