import Joi from 'joi';

export const LoginController = Joi.object().keys({
    username: Joi.string()
        .trim()
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

})

