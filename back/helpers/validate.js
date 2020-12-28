// Plugin pour définir la structure d'une fonction de validation,
// utilisé dans le middleware validate.js

const Validator = require('validatorjs');

const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};



module.exports = validator;