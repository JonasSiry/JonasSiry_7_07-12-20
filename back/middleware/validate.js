// Fonctions de protection des données d'utilisateur, valide le format correct des inputs

const validator = require('../helpers/validate');

const signup = (req, res, next) => {
    const validationRule = {
        "firstName": "required|string",
        "lastName": "required|string",
        "email": "required|email",
        "password": "required|string|min:8",
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            console.log(req)
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const login = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "password": "required|string|min:8"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const update = (req, res, next) => {
    const validationRule = {
        "firstName": "required|string",
        "lastName": "required|string",
        "email": "required|email",
        "password": "string|min:8",
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            console.log(req)
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });

}

module.exports = {
    signup,
    login,
    update
}