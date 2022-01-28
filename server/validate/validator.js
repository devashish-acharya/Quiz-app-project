const isEmpty = require('is-empty');
const validator = require("validator");

//validating logins
module.exports.loginValidator = (data) => {
    const errors = {};

    //returning null/unidentified data as string
    data.email = !(isEmpty(data.email)) ? data.email : '';
    data.password = !(isEmpty(data.password)) ? data.password : '';

    //login error variables
    let emEr = validator.isEmpty(data.email) ? 'Email  required' : (!validator.isEmail(data.email) ? 'Provide valid email' : '');
    let psEr = validator.isEmpty(data.password) ? 'Password required' : '';

    if (emEr) errors.email = emEr;
    if (psEr) errors.password = psEr;

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

//validating registrations
module.exports.registerValidator = (data) => {
    const errors = {};
 //returning null/unidentified data as string
    data.email = !(isEmpty(data.email)) ? data.email : '';
    data.password = !(isEmpty(data.password)) ? data.password : '';
    data.firstName = !(isEmpty(data.firstName)) ? data.firstName : '';
    data.lastName = !(isEmpty(data.lastName)) ? data.lastName : '';


    //registration error variables
    let emEr = validator.isEmpty(data.email) ? 'Email required' : (!validator.isEmail(data.email) ? 'provide email' : '');
    let psEr = validator.isEmpty(data.password) ? 'Password  required' : '';
    let fnEr = validator.isEmpty(data.firstName) ? 'First Name required' : '';
    let lnEr = validator.isEmpty(data.lastName) ? 'Last name  required' : '';

    if (emEr) errors.email = emEr;
    if (psEr) errors.password = psEr;
    if (fnEr || lnEr) errors.firstName = 'name is required';

    return {
        errors,
        isValid: isEmpty(errors)
    }
}